import { type MilochauCoreOptions } from "@amilochau/core-vue3/types"
import { Auth } from "@aws-amplify/auth"
import type { App } from "vue"

export default {
  install: (app: App, options: MilochauCoreOptions) => {
    if (options.identity) {
      Auth.configure({
        userPoolId: options.identity.cognito.userPoolId,
        userPoolWebClientId: options.identity.cognito.clientId,
      })
    }
  }
}
