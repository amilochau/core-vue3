import { CognitoUserPool, CognitoUserSession, ICognitoUserPoolData } from "amazon-cognito-identity-js"
import { useCoreOptions } from "./options"
import { useIdentityStore } from '../stores'
import { storeToRefs } from "pinia"

export function useCognito() {

  const identityStore = useIdentityStore()
  const { isAuthenticated, attributes } = storeToRefs(identityStore)
  const coreOptions = useCoreOptions()

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
