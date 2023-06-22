import type { Ref } from "vue"
import type { I18nOptions } from "vue-i18n"
import type { Router, RouteRecordRaw } from "vue-router"
import type { VuetifyOptions } from "vuetify/framework"

export type MilochauCoreOptions = {
  application: {
    name: string,
    contact: string,
    navigation: Ref<any[]>,
    header: {
      disabled?: boolean,
      onTitleClick?: (router: Router) => void,
    },
    footer?: {
      enabled: true,
      items?: Ref<{
        link: string,
        title: string,
      }[]>,
    },
    isProduction: boolean,
  },
  api?: {
    gatewayUri: string,
  },
  i18n: I18nOptions & { messages: MilochauCoreOptionsMessages },
  vuetify?: VuetifyOptions,
  identity?: {
    cognito: {
      userPoolId: string,
      clientId: string,
    },
  },
  routes: Array<RouteRecordRaw>,
  clean: () => () => void,
}

export type MilochauCoreOptionsMessages = {
  [lang: string]: {
    appTitle: string
  }
}
