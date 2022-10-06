import { mdiAlert, mdiAlertOctagon, mdiCheckboxMarkedCircle, mdiInformation } from '@mdi/js'
import { defineStore } from 'pinia'
import { useI18n } from 'vue-i18n'
import { RouteLocationNormalizedLoaded } from 'vue-router'
import { useMapsStore } from '.'
import { ApplicationMessage, IHomeMessage } from '../models/definitions'

export const useStore = defineStore('app', {
  state: () => ({
    name: 'Maps',
    drawer: false,
    loading: false,
    message: new ApplicationMessage('', 'info', mdiInformation),
    homeMessages: new Array<IHomeMessage>(),
    metaArgs: {} as Record<string, string>
  }),
  getters: {
    snackbarMessage: (state) => state.message,
    applicationTitle: (state) => {
      const i18n = useI18n()

      return (route: RouteLocationNormalizedLoaded) => {
        const routeName = route.name?.toString()
        const title = routeName ? i18n.t(`meta.${routeName}.title`, state.metaArgs) : undefined
        return title ? `${title} — ${state.name}` : state.name
      }
    },
    applicationDescription: (state) => {
      const i18n = useI18n()

      return (route: RouteLocationNormalizedLoaded) => {
        const routeName = route.name?.toString()
        const description = routeName ? i18n.t(`meta.${routeName}.description`, state.metaArgs) : undefined
        return description ? `${description} — ${state.name}` : state.name
      }
    }
  },
  actions: {
    displayMessage(message: ApplicationMessage) {
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
      const mapsStore = useMapsStore()
      mapsStore.clean()
    }
  }
})
