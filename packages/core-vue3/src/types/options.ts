import { RouteRecordRaw } from "vue-router"

export type MilochauCoreOptions = {
  application: {
    name: string,
    contact: string,
    navigation: (t: any) => any[],
  },
  api: {
    gatewayUri: string
  },
  messages: {}
  identity: {
    authorities: {
      register_login: string,
      profile_editing: string,
    },
    scopes: {
      use: string,
    },
    auth: {
      clientId: string,
      authority: string,
      knownAuthorities: string[],
      redirectUri: string,
      postLogoutRedirectUri: string,
    },
    loginRequest: {
      scopes: string[]
    }
  },
  routes: Array<RouteRecordRaw>,
  clean: () => () => void
}
