import { BrowserAuthOptions } from "@azure/msal-browser"
import { Ref } from "vue"
import { I18nOptions } from "vue-i18n"
import { Router, RouteRecordRaw } from "vue-router"
import { VuetifyOptions } from "vuetify/framework"

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
  i18n: I18nOptions & { messages: { [lang: string]: { appTitle: string }}},
  vuetify?: VuetifyOptions,
  identity: {
    authorities: {
      register_login: string,
      profile_editing: string,
    },
    scopes: {
      use: string,
    },
    auth: BrowserAuthOptions,
    loginRequest: {
      scopes: string[]
    }
  },
  routes: Array<RouteRecordRaw>,
  clean: () => () => void
}
