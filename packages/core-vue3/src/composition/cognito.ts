import { AuthenticationDetails, ChallengeName, CognitoUser, CognitoUserAttribute, CognitoUserPool, CognitoUserSession, ICognitoUserPoolData, ISignUpResult } from "amazon-cognito-identity-js"
import { useCoreOptions } from "./options"
import { useIdentityStore } from '../stores'
import { EditPassword, ConfirmEmail, ForgotPassword, Login, Register, ResetPassword, EditProfile, LoginErrorType } from "../types"

export function useCognito() {

  const identityStore = useIdentityStore()
  const coreOptions = useCoreOptions()

  const userPoolData: ICognitoUserPoolData = {
    UserPoolId: coreOptions.identity.cognito.userPoolId,
    ClientId: coreOptions.identity.cognito.clientId,
  }

  const signUp = (model: Register) => new Promise<ISignUpResult | undefined>((resolve, reject) => {
    const userPool = new CognitoUserPool(userPoolData);
    const attributes = [
      new CognitoUserAttribute({ Name: 'email', Value: model.email }),
      new CognitoUserAttribute({ Name: 'name', Value: model.name }),
    ]
    userPool.signUp(model.email, model.password, attributes, [], (error, result) => {
      if (error) {
        reject(error.message || JSON.stringify(error))
      } else {
        resolve(result)
      }
    })
  })

  const authenticateUser = (model: Login) => new Promise<CognitoUserSession>((resolve, reject) => {
    const userPool = new CognitoUserPool(userPoolData)
    const user = new CognitoUser({ Username: model.email, Pool: userPool })
    const authenticationDetails = new AuthenticationDetails({ Username: model.email, Password: model.password })

    user.authenticateUser(authenticationDetails, {
      onFailure: (error) => {
        reject({ type: LoginErrorType.Unknown, message: error.message || JSON.stringify(error) })
      },
      onSuccess: (session) => {
        resolve(session)
      },
      mfaSetup: (challengeName: ChallengeName, challengeParameters) => {
        // call user.associateSoftwareToken() to get the secret code to display in a QR code
        reject({ type: LoginErrorType.MfaSetup, args: { challengeName, challengeParameters } })
      },
      customChallenge: (challengeParameters) => {
        reject({ type: LoginErrorType.CustomChallenge, args: { challengeParameters } })
      },
      mfaRequired: (challengeName: ChallengeName, challengeParameters) => {
        reject({ type: LoginErrorType.MfaRequired, args: { challengeName, challengeParameters } })
      },
      newPasswordRequired: (userAttributes, requiredAttributes) => {
        reject({ type: LoginErrorType.NewPasswordRequired, args: { userAttributes, requiredAttributes } })
      },
      selectMFAType: (challengeName: ChallengeName, challengeParameters) => {
        reject({ type: LoginErrorType.SelectMFAType, args: { challengeName, challengeParameters } })
      },
      totpRequired: (challengeName: ChallengeName, challengeParameters) => {
        reject({ type: LoginErrorType.TotpRequired, args: { challengeName, challengeParameters } })
      },
    })
  })

  const forgotPassword = (model: ForgotPassword) => new Promise((resolve, reject) => {
    const userPool = new CognitoUserPool(userPoolData);
    const user = new CognitoUser({ Username: model.email, Pool: userPool })
    user.forgotPassword({
      onFailure: (error) => {
        reject(error.message || JSON.stringify(error))
      },
      onSuccess: (result) => {
        resolve(result)
      }
    })
  })

  const confirmPassword = (model: ResetPassword) => new Promise((resolve, reject) => {
    const userPool = new CognitoUserPool(userPoolData);
    const user = new CognitoUser({ Username: model.email, Pool: userPool })
    user.confirmPassword(model.code, model.password, {
      onFailure: (error) => {
        reject(error.message || JSON.stringify(error))
      },
      onSuccess: (result) => {
        resolve(result)
      }
    })
  })

  const confirmRegistration = (model: ConfirmEmail) => new Promise((resolve, reject) => {
    const userPool = new CognitoUserPool(userPoolData)
    const user = new CognitoUser({ Username: model.email, Pool: userPool })
    user.confirmRegistration(model.code, true, (error, result) => {
      if (error) {
        reject(error.message || JSON.stringify(error))
      } else {
        resolve(result)
      }
    })
  })

  const changePassword = async (model: EditPassword) => {
    const { currentUser } = await getSession()
    return new Promise((resolve, reject) => {
      currentUser.changePassword(model.oldPassword, model.password, (error, result) => {
        if (error) {
          reject(error.message || JSON.stringify(error))
        } else {
          resolve(result)
        }
      })
    })
  }

  const updateAttributes = async (model: EditProfile) => {
    const { currentUser } = await getSession()
    var attributes = [
      new CognitoUserAttribute({ Name: 'name', Value: model.name }),
    ]
    return new Promise((resolve, reject) => {
      currentUser.updateAttributes(attributes, (error, result) => {
        if (error) {
          reject(error.message || JSON.stringify(error))
        } else {
          resolve(result)
        }
      })
    })
  }

  const deleteUser = async () => {
    const { currentUser } = await getSession()
    return new Promise((resolve, reject) => {
      currentUser.deleteUser((error, result) => {
        if (error) {
          reject(error.message || JSON.stringify(error))
        } else {
          resolve(result)
        }
      })
    })
  }

  /** Should not be used alone, use 'getSession' instead */
  const getCurrentUser = () => new Promise<CognitoUser>((resolve, reject) => {
    const userPool = new CognitoUserPool(userPoolData)
    const currentUser = userPool.getCurrentUser()
    if (!currentUser) {
      reject()
    } else {
      resolve(currentUser)
    }
  })

  const getSession = async () => {
    const currentUser = await getCurrentUser()
    return new Promise<{ currentUser: CognitoUser, session: CognitoUserSession }>((resolve, reject) => {
      currentUser.getSession((error, session) => {
        if (error) {
          reject(error.message || JSON.stringify(error))
        } else {
          resolve({ currentUser, session })
        }
      })
    })
  }

  const getToken = async () => {
    const { session } = await getSession();
    return session.getIdToken().getJwtToken();
  }

  const fetchUserAttributes = async () => {
    const { currentUser } = await getSession()
    return new Promise((resolve, reject) => {
      currentUser.getUserAttributes((error, attributes) => {
        if (error) {
          reject(error.message || JSON.stringify(error))
        } else {
          identityStore.setAttributes(attributes)
          resolve(attributes)
        }
      })
    })
  }

  const signOut = async () => {
    const { currentUser } = await getSession()
    currentUser.signOut()
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
