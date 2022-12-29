import { CognitoUserPool, CognitoUserSession, ICognitoUserPoolData } from "amazon-cognito-identity-js"
import { useRouter } from "vue-router"
import { useCoreOptions } from "./options"
import { useIdentityStore } from '../stores'
import { storeToRefs } from "pinia"

export function useCognito() {

  const identityStore = useIdentityStore()
  const router = useRouter()

  const { isAuthenticated, attributes } = storeToRefs(identityStore)

  const login = () => {
    router.push({ name: 'Login' })
  }

  const register = () => {
    router.push({ name: 'Register' })
  }

  const editProfile = () => {
    router.push({ name: 'EditProfile' })
  }

  const editPassword = () => {
    router.push({ name: 'EditPassword' })
  }

  const deleteAccount = () => {
    router.push({ name: 'DeleteAccount' })
  }

  return {
    isAuthenticated,
    attributes,
    login,
    register,
    editProfile,
    editPassword,
    deleteAccount,
  }
}

export function useCognitoClient() {

  const { isAuthenticated, attributes } = useCognito()
  const coreOptions = useCoreOptions()
  const identityStore = useIdentityStore()

  const userPoolData: ICognitoUserPoolData = {
    UserPoolId: coreOptions.identity.cognito.userPoolId,
    ClientId: coreOptions.identity.cognito.clientId,
  }

  const getToken = () => new Promise<string>((resolve, reject) => {
    const userPool = new CognitoUserPool(userPoolData)
    const currentUser = userPool.getCurrentUser()
    if (!currentUser) {
      return reject()
    }

    currentUser.getSession((error, session) => {
      if (error) {
        return reject(error)
      }

      const accessToken = (session as CognitoUserSession).getIdToken().getJwtToken()

      resolve(accessToken)
    })
  })

  const silentlyFetchAttributes = () => {
    const userPool = new CognitoUserPool(userPoolData)
    const currentUser = userPool.getCurrentUser()
    currentUser?.getSession((error: Error) => {
      if (error) {
        return
      }

      currentUser?.getUserAttributes((error, attributes) => {
        if (error) {
          return
        }

        identityStore.setAttributes(attributes)
      })
    })
  }

  const silentlyLogout = () => {
    const userPool = new CognitoUserPool(userPoolData)
    const currentUser = userPool.getCurrentUser()
    currentUser?.signOut()
  }

  return {
    isAuthenticated,
    attributes,
    userPoolData,
    getToken,
    silentlyLogout,
    silentlyFetchAttributes,
  }
}
