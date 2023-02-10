import { useIdentityStore } from '../stores'
import type { EditPassword, ConfirmEmail, ForgotPassword, Login, Register, ResetPassword, EditProfile } from "../types"
import { Auth } from 'aws-amplify';

export function useCognito() {

  const identityStore = useIdentityStore()

  const signUp = (model: Register) => {
    return Auth.signUp({
      username: model.email,
      password: model.password,
      attributes: {
          email: model.email,
          name: model.name,
      },
    })
  }

  const authenticateUser = (model: Login) => {
    return Auth.signIn({
      username: model.email,
      password: model.password,
    })
  }

  const forgotPassword = (model: ForgotPassword) => {
    return Auth.forgotPassword(model.email)
  }

  const confirmPassword = (model: ResetPassword) => {
    return Auth.forgotPasswordSubmit(model.email, model.code, model.password)
  }

  const confirmRegistration = (model: ConfirmEmail) => {
    return Auth.confirmSignUp(model.email, model.code)
  }

  const changePassword = async (model: EditPassword) => {
    const user = await Auth.currentAuthenticatedUser()
    return await Auth.changePassword(user, model.oldPassword, model.password)
  }

  const updateAttributes = async (model: EditProfile) => {
    const user = await Auth.currentAuthenticatedUser()
    return await Auth.updateUserAttributes(user, {
      name: model.name,
    })
  }

  const deleteUser = () => {
    return Auth.deleteUser()
  }

  const getToken = async () => {
    const session = await Auth.currentSession()
    return session.getIdToken().getJwtToken()
  }

  const fetchUserAttributes = async () => {
    const user = await Auth.currentAuthenticatedUser()
    const attributes = await Auth.userAttributes(user)
    identityStore.setAttributes({
      id: attributes?.find((x) => x.Name === 'sub')?.Value || '',
      name: attributes?.find((x) => x.Name === 'name')?.Value || '',
      email: attributes?.find((x) => x.Name === 'email')?.Value || '',
    })
  }

  const signOut = () => {
    return Auth.signOut({
      global: false
    })
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
