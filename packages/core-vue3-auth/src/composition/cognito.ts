import { type EditPassword, type ConfirmEmail, type ForgotPassword, type Login, type Register, type ResetPassword, type EditProfile } from "../types"
import { Auth } from '@aws-amplify/auth';
import { useI18n } from 'vue-i18n';
import { mdiAlert } from '@mdi/js';
import { ApplicationMessage, useCoreOptions, useIdentityStore } from '@amilochau/core-vue3';

export const useCognito = () => {

  const identityStore = useIdentityStore()
  const coreOptions = useCoreOptions()
  const { t, mergeLocaleMessage } = useI18n()

  mergeLocaleMessage('en', {
    errorMessage: "An error occured."
  })
  mergeLocaleMessage('fr', {
    errorMessage: "Une erreur est survenue."
  })

  const processRequest = async <TResponse>(request: () => Promise<TResponse>) => {
    if (!coreOptions.authenticationEnabled) {
      throw 'Authentication is not configured.'
    }

    try {
      return await request()
    } catch (error) {
      throw new ApplicationMessage(t('errorMessage'), 'error', mdiAlert, error as string)
    }
  }

  const signUp = (model: Register) => {
    return processRequest(() => Auth.signUp({
      username: model.email,
      password: model.password,
      attributes: {
          email: model.email,
          name: model.name,
      },
    }))
  }

  const authenticateUser = async (model: Login) => {
    await processRequest(() => Auth.signIn({
      username: model.email,
      password: model.password,
    }))
    identityStore.isAuthenticated = true
    identityStore.onLogout = () => signOut()
  }

  const forgotPassword = (model: ForgotPassword) => {
    return processRequest(() => Auth.forgotPassword(model.email))
  }

  const confirmPassword = (model: ResetPassword) => {
    return processRequest(() => Auth.forgotPasswordSubmit(model.email, model.code, model.password))
  }

  const confirmRegistration = (model: ConfirmEmail) => {
    return processRequest(() => Auth.confirmSignUp(model.email, model.code))
  }

  const changePassword = async (model: EditPassword) => {
    return processRequest(async () => {
      const user = await Auth.currentAuthenticatedUser()
      return await Auth.changePassword(user, model.oldPassword, model.password)
    })
  }

  const updateAttributes = async (model: EditProfile) => {
    return processRequest(async () => {
      const user = await Auth.currentAuthenticatedUser()
      return await Auth.updateUserAttributes(user, {
        name: model.name,
      })
    })
  }

  const deleteUser = () => {
    return processRequest(() => Auth.deleteUser())
  }

  const getToken = async () => {
    return processRequest(async () => {
      const session = await Auth.currentSession()
      const idToken = session.getIdToken()
      return idToken.getJwtToken()
    })
  }

  const fetchUserAttributes = async () => {
    return processRequest(async () => {
      const user = await Auth.currentAuthenticatedUser()
      const attributes = await Auth.userAttributes(user)
      identityStore.setAttributes({
        id: attributes?.find((x) => x.Name === 'sub')?.Value || '',
        name: attributes?.find((x) => x.Name === 'name')?.Value || '',
        email: attributes?.find((x) => x.Name === 'email')?.Value || '',
      })
    })
  }

  const signOut = () => {
    return processRequest(() => Auth.signOut({
      global: false
    }))
  }

  return {
    signUp,
    authenticateUser,
    forgotPassword,
    confirmPassword,
    confirmRegistration,
    changePassword,
    updateAttributes,
    deleteUser,

    getToken,
    fetchUserAttributes,
    signOut,
  }
}
