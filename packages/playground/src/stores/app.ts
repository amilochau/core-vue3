import { mdiAlert, mdiAlertOctagon, mdiCheckboxMarkedCircle, mdiInformation } from '@mdi/js'
import { defineStore } from 'pinia'
import { useI18n } from 'vue-i18n'
import { RouteLocationNormalizedLoaded } from 'vue-router'
import { ApplicationMessage, IHomeMessage } from '../models/definitions'

export const useStore = defineStore('app', {
  state: () => ({
    name: 'Maps',
    contact: 'Antoine Milochau',
    drawer: false,
    loading: false,
    message: new ApplicationMessage('', 'info', mdiInformation),
    homeMessages: new Array<IHomeMessage>(),
    currentMap: { title: '', desc: '' }
  }),
  getters: {
    snackbarMessage: (state) => state.message,
    applicationTitle: (state) => {
      const i18n = useI18n()

      return (route: RouteLocationNormalizedLoaded) => {
        const routeName = route.name?.toString()
        const hasSuffix = i18n.te(`meta.${routeName}.suffix`)
        const title = routeName ? i18n.t(`meta.${routeName}.title`, {
          mapName: hasSuffix && state.currentMap.title ? `${state.currentMap.title}${i18n.t(`meta.${routeName}.suffix`)}` : state.currentMap.title,
          mapDesc: hasSuffix && state.currentMap.desc ? `${state.currentMap.desc}${i18n.t(`meta.${routeName}.suffix`)}` : state.currentMap.desc
        }) : undefined
        return title ? `${title} — ${state.name}` : state.name
      }
    },
    applicationDescription: (state) => {
      const i18n = useI18n()

      return (route: RouteLocationNormalizedLoaded) => {
        const routeName = route.name?.toString()
        const description = routeName ? i18n.t(`meta.${routeName}.description`, {
          mapName: state.currentMap.title,
          mapDesc: state.currentMap.desc
        }) : undefined
        return description ? `${description} — ${state.name}` : state.name
      }
    }
  },
  actions: {
    displayMessage(message: ApplicationMessage) {
      this.router
      this.message = message
    },
    displayInfoMessage(title: string, details?: string) {
      this.message = new ApplicationMessage(title, 'info', mdiInformation, details)
    },
    displaySuccessMessage(title: string, details?: string) {
      this.message = new ApplicationMessage(title, 'success', mdiCheckboxMarkedCircle, details)
    },
    displayWarningMessage(title: string, details?: string) {
      this.message = new ApplicationMessage(title, 'warning', mdiAlertOctagon, details)
    },
    displayErrorMessage(title: string, details?: string) {
      this.message = new ApplicationMessage(title, 'error', mdiAlert, details)
    },
    setDrawer(value: boolean) {
      this.drawer = value
    },
    clean() {
      // Clean storages with personal data
    }
  }
})
