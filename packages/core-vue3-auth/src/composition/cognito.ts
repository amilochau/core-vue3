import { type ConfirmEmail, type EditPassword, type EditProfile, type ForgotPassword, type Login, type Register, type ResetPassword, type SetPassword } from '../types';
import {
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
import { useCoreOptions } from '@amilochau/core-vue3/composition';
import { useIdentityStore } from '@amilochau/core-vue3/stores';

export const useCognito = () => {

  const identityStore = useIdentityStore();
  const coreOptions = useCoreOptions();
  const { t, mergeLocaleMessage } = useI18n();

  mergeLocaleMessage('en', {
    errorMessage: 'An error occured.',
    incorrectUsernamePassword: 'Incorrect email address or password.',
    incorrectPassword: 'Incorrect password.',
    incorrectCode: 'Incorrect validation code.',
    expiredCode: 'Expired validation code, or bad email address.',
    userAlreadyAuthenticated: 'You are already authenticated. If this does not seem to be the case, try to clean your browser data.',
    usernameExists: 'A user account already exists with this email address. You can try to login!',
  });
  mergeLocaleMessage('fr', {
    errorMessage: 'Une erreur est survenue.',
    incorrectUsernamePassword: 'Adresse email ou mot de passe incorrect.',
    incorrectPassword: 'Mot de passe incorrect.',
    incorrectCode: 'Code de validation incorrect.',
    expiredCode: 'Code de validation expiré, ou mauvaise adresse email.',
    userAlreadyAuthenticated: 'Vous êtes déjà connecté. Si cela ne semble pas être le cas, essayez de nettoyer les données de votre navigateur.',
    usernameExists: 'Un compte utilisateur existe déjà avec cette adresse email. Vous pouvez essayer de vous connecter !',
  });

  const processRequest = async <TResponse>(request: () => Promise<TResponse>, errorMapping: Record<string, string>) => {
    if (!coreOptions.authenticationEnabled) {
      throw 'Authentication is not configured.';
    }

    try {
      return await request();
    } catch (error: any) {
      let errorMessage = errorMapping[error?.name];
      if (!errorMessage) {
        console.warn('Unexpected error from Cognito', error?.name, error);
        errorMessage = t('errorMessage');
      }
      throw { title: errorMessage, color: 'error', icon: mdiAlert, details: error as string } as ApplicationMessage;
    }
  };

  const signOut = () => processRequest(() => awsSignOut(), {});

  return {
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

    confirmRegistration: (model: ConfirmEmail) => processRequest(() => awsConfirmSignUp({
      username: model.email,
      confirmationCode: model.code,
    }), {
      ['CodeMismatchException']: t('incorrectCode'),
      ['ExpiredCodeException']: t('expiredCode'),
    }),

    authenticateUser: (model: Login) => processRequest(async () => {
      const response = await awsSignIn({
        username: model.email,
        password: model.password,
        options: {
          authFlowType: coreOptions.identity?.usersMigrationDisabled ? 'USER_SRP_AUTH' : 'USER_PASSWORD_AUTH',
        },
      });

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

    forgotPassword: (model: ForgotPassword) => processRequest(() => awsResetPassword({
      username: model.email,
    }), {}),

    confirmPassword: (model: ResetPassword) => processRequest(() => awsConfirmResetPassword({
      username: model.email,
      confirmationCode: model.code,
      newPassword: model.password,
    }), {
      ['CodeMismatchException']: t('incorrectCode'),
    }),

    changePassword: (model: EditPassword) => processRequest(() => awsUpdatePassword({
      oldPassword: model.oldPassword,
      newPassword: model.password,
    }), {
      ['NotAuthorizedException']: t('incorrectPassword'),
    }),

    updateAttributes: (model: EditProfile) => processRequest(async () => awsUpdateUserAttributes({
      userAttributes: {
        name: model.name,
      },
    }), {}),

    deleteUser: () => processRequest(() => awsDeleteUser(), {}),

    getJwtToken: () => processRequest(async () => {
      const authSession = await awsFetchAuthSession();
      return authSession.tokens?.idToken?.toString();
    }, {}),

    fetchUserAttributes: () => processRequest(async () => {
      const userAttributes = await awsFetchUserAttributes();
      identityStore.setAttributes({
        id: userAttributes.sub || '',
        name: userAttributes.name || '',
        email: userAttributes.email || '',
      });
    }, {}),

    signOut,
  };
};
