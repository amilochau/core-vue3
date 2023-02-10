import { Auth } from "@aws-amplify/auth"
import type { App } from "vue"
import type { MilochauCoreOptions } from "../types/options"

export default {
  install: (app: App, options: MilochauCoreOptions) => {

    Auth.configure({
      userPoolId: options.identity.cognito.userPoolId,
      userPoolWebClientId: options.identity.cognito.clientId,
    })
  }
}
