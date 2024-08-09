import { type ConfirmEmail, type EditPassword, type EditProfile, type ForgotPassword, type Login, type Register, type ResetPassword, type SetPassword } from '../types';
import {
  type SignInOutput,
  confirmResetPassword as awsConfirmResetPassword,
  confirmSignIn as awsConfirmSignIn,
  confirmSignUp as awsConfirmSignUp,
  deleteUser as awsDeleteUser,
  fetchAuthSession as awsFetchAuthSession,
  fetchUserAttributes as awsFetchUserAttributes,
  resetPassword as awsResetPassword,
  signIn as awsSignIn,
  signOut as awsSignOut,
  signUp as awsSignUp,
  updatePassword as awsUpdatePassword,
  updateUserAttributes as awsUpdateUserAttributes,
} from 'aws-amplify/auth';
import { useI18n } from 'vue-i18n';
import { mdiAlert } from '@mdi/js';
import { type ApplicationMessage } from '@amilochau/core-vue3/types';
import { useAppOptions, useClean } from '@amilochau/core-vue3/composition';
import { useIdentityStore } from '@amilochau/core-vue3/stores';

/** Use Cognito. */
export const useCognito = () => {

  const identityStore = useIdentityStore();
  const { authenticationEnabled, coreOptions } = useAppOptions();
  const { t, mergeLocaleMessage } = useI18n();
  const { clean } = useClean();

  mergeLocaleMessage('en', {
    defaultError: 'An error occured.',
    incorrectUsernamePassword: 'Incorrect email address or password.',
    incorrectPassword: 'Incorrect password.',
    incorrectCode: 'Incorrect validation code.',
    expiredCode: 'Expired validation code, or bad email address.',
    userAlreadyAuthenticated: 'You are already authenticated. If this does not seem to be the case, try to clean your browser data.',
    usernameExists: 'A user account already exists with this email address. You can try to login!',
  });
  mergeLocaleMessage('fr', {
    defaultError: 'Une erreur est survenue.',
    incorrectUsernamePassword: 'Adresse email ou mot de passe incorrect.',
    incorrectPassword: 'Mot de passe incorrect.',
    incorrectCode: 'Code de validation incorrect.',
    expiredCode: 'Code de validation expiré, ou mauvaise adresse email.',
    userAlreadyAuthenticated: 'Vous êtes déjà connecté. Si cela ne semble pas être le cas, essayez de nettoyer les données de votre navigateur.',
    usernameExists: 'Un compte utilisateur existe déjà avec cette adresse email. Vous pouvez essayer de vous connecter !',
  });

  const processRequest = async <TResponse>(request: () => Promise<TResponse>, errorMapping: Record<string, string>) => {
    if (!authenticationEnabled) {
      throw 'Authentication is not configured.';
    }

    try {
      return await request();
    } catch (error: any) {
      let errorMessage = errorMapping[error?.name];
      if (!errorMessage) {
        console.warn('Unexpected error from Cognito', error?.name, error);
        errorMessage = t('defaultError');
      }
      throw { title: errorMessage, color: 'error', icon: mdiAlert, details: error as string } as ApplicationMessage;
    }
  };

  const signOut = async () => {
    await awsSignOut();
    clean();
  };

  return {
    /**
     * Sign up.
     * @param model Register model.
     */
    signUp: (model: Register) => processRequest(() => awsSignUp({
      username: model.email,
      password: model.password,
      options: {
        userAttributes: {
          email: model.email,
          name: model.name,
        },
      },
    }), {
      ['UsernameExistsException']: t('usernameExists'),
    }),

    /**
     * Confirm registration.
     * @param model Confirm email model.
     */
    confirmRegistration: (model: ConfirmEmail) => processRequest(() => awsConfirmSignUp({
      username: model.email,
      confirmationCode: model.code,
    }), {
      ['CodeMismatchException']: t('incorrectCode'),
      ['ExpiredCodeException']: t('expiredCode'),
    }),

    /**
     * Authenticate user.
     * @param model Login model.
     */
    authenticateUser: (model: Login) => processRequest(async () => {
      let response: SignInOutput;
      try {
        response = await awsSignIn({
          username: model.email,
          password: model.password,
          options: {
            authFlowType: coreOptions.identity?.usersMigrationDisabled ? 'USER_SRP_AUTH' : 'USER_PASSWORD_AUTH',
          },
        });
      } catch (error: any) {
        if (error.name === 'UserAlreadyAuthenticatedException' || error.name === 'DeviceMetadataNotFoundException') {
          console.warn('Logout has been required, because user has already been logged in.', error);
          await signOut();
          response = await awsSignIn({
            username: model.email,
            password: model.password,
            options: {
              authFlowType: coreOptions.identity?.usersMigrationDisabled ? 'USER_SRP_AUTH' : 'USER_PASSWORD_AUTH',
            },
          });
        } else {
          throw error;
        }
      }

      if (response.isSignedIn) {
        identityStore.isAuthenticated = true;
      }

      return {
        success: response.isSignedIn,
        nextStep: response.nextStep.signInStep,
      };
    }, {
      ['NotAuthorizedException']: t('incorrectUsernamePassword'),
    }),

    /**
     * Confirm login.
     * @param model Set password model.
     */
    confirmLogin: (model: SetPassword) => processRequest(async () => {
      const response = await awsConfirmSignIn({
        challengeResponse: model.password,
      });

      if (response.isSignedIn) {
        identityStore.isAuthenticated = true;
      }

      return {
        success: response.isSignedIn,
        nextStep: response.nextStep.signInStep,
      };
    }, {}),

    /**
     * Forgot password.
     * @param model Forgot password model.
     */
    forgotPassword: (model: ForgotPassword) => processRequest(() => awsResetPassword({
      username: model.email,
    }), {}),

    /**
     * Confirm password.
     * @param model Confirm password model.
     */
    confirmPassword: (model: ResetPassword) => processRequest(() => awsConfirmResetPassword({
      username: model.email,
      confirmationCode: model.code,
      newPassword: model.password,
    }), {
      ['CodeMismatchException']: t('incorrectCode'),
    }),

    /**
     * Change password.
     * @param model Edit password model.
     */
    changePassword: (model: EditPassword) => processRequest(() => awsUpdatePassword({
      oldPassword: model.oldPassword,
      newPassword: model.password,
    }), {
      ['NotAuthorizedException']: t('incorrectPassword'),
    }),

    /**
     * Update profile attributes.
     * @param model Edit profile model.
     */
    updateAttributes: (model: EditProfile) => processRequest(async () => awsUpdateUserAttributes({
      userAttributes: {
        name: model.name,
      },
    }), {}),

    /** Delete user. */
    deleteUser: () => processRequest(() => awsDeleteUser(), {}),

    /** Get a JWT token. */
    getJwtToken: () => processRequest(async () => {
      const authSession = await awsFetchAuthSession();
      return authSession.tokens?.idToken?.toString();
    }, {}),

    /** Fetch user attributes. */
    fetchUserAttributes: () => processRequest(async () => {
      const userAttributes = await awsFetchUserAttributes();
      identityStore.setAttributes({
        sub: userAttributes.sub || '',
        name: userAttributes.name || '',
        email: userAttributes.email || '',
        user_id: userAttributes['custom:user_id'] || '',
      });
    }, {}),

    /** Sign out. */
    signOut,
  };
};
