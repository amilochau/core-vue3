import { type MilochauCoreOptions } from "@amilochau/core-vue3/types"
import { Amplify } from "aws-amplify"
import type { App } from "vue"

export default {
  install: (app: App, options: MilochauCoreOptions) => {
    if (options.identity) {
      Amplify.configure({
        Auth: {
          Cognito: {
            userPoolId: options.identity.cognito.userPoolId,
            userPoolClientId: options.identity.cognito.clientId,
          }
        }
      })
    }
  }
}
