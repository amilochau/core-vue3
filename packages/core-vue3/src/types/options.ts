import type { Ref } from "vue"
import type { I18nOptions } from "vue-i18n"
import type { Router, RouteRecordRaw } from "vue-router"
import type { VuetifyOptions } from "vuetify/framework"

export type MilochauCoreOptions = {
  application: {
    name: string,
    contact: string,
    navigation: Ref<any[]>,
    onAppBarTitleClick?: (router: Router) => void,
  },
  api: {
    gatewayUri: string,
  },
  i18n: I18nOptions & { messages: { [lang: string]: { appTitle: string }}},
  vuetify?: VuetifyOptions,
  identity: {
    cognito: {
      userPoolId: string,
      clientId: string,
    },
  },
  routes: Array<RouteRecordRaw>,
  clean: () => () => void,
}
