import { useIdentityStore } from '../stores'
import { type EditPassword, type ConfirmEmail, type ForgotPassword, type Login, type Register, type ResetPassword, type EditProfile, ApplicationMessage } from "../types"
import { Auth } from '@aws-amplify/auth';
import { useI18n } from 'vue-i18n';
import { mdiAlert } from '@mdi/js';

export function useCognito() {

  const identityStore = useIdentityStore()
  const { t, mergeLocaleMessage } = useI18n()

  mergeLocaleMessage('en', {
    errorMessage: "An error occured."
  })
  mergeLocaleMessage('fr', {
    errorMessage: "Une erreur est survenue."
  })

  const processRequest = async <TResponse>(request: () => Promise<TResponse>) => {
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

  const authenticateUser = (model: Login) => {
    return processRequest(() => Auth.signIn({
      username: model.email,
      password: model.password,
    }))
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
      try {
        const session = await Auth.currentSession()
        console.log('Auth.currentSession()')
        console.log(session)
        const idToken = session.getIdToken()
        console.log('session.getIdToken()')
        console.log(idToken)
        return idToken.getJwtToken()
      } catch (error) {
        console.log('error on getToken')
        console.log(error)
      }
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
