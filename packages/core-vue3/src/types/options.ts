import type { Ref } from "vue"
import type { I18nOptions } from "vue-i18n"
import type { RouteRecordRaw } from "vue-router"
import type { VuetifyOptions } from "vuetify"
import type { NotificationsRegisterRequest } from "./application/notifications"

export type MilochauCoreOptions = {
  application: {
    name: string,
    contact: string,
    logoUrl?: string,
    navigation: Ref<{
      items: any[],
      appendItems?: any[],
    }>,
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
  pwa?: {
    hideInstallBtn: boolean,
  },
  notifications?: {
    pushKey: string,
    register: () => (request: NotificationsRegisterRequest) => Promise<void>
  },
}

export type MilochauCoreOptionsMessages = {
  [lang: string]: {
    appTitle: string
  }
}
