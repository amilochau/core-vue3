import { Ref } from "vue"
import { I18nOptions } from "vue-i18n"
import { Router, RouteRecordRaw } from "vue-router"

export type MilochauCoreOptions = {
  application: {
    name: string,
    contact: string,
    navigation: Ref<any[]>,
    onAppBarTitleClick?: (router: Router) => void
  },
  api: {
    gatewayUri: string
  },
  i18n: I18nOptions,
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
