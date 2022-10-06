import { mdiAlert, mdiAlertOctagon, mdiCheckboxMarkedCircle, mdiInformation } from '@mdi/js'
import { defineStore } from 'pinia'
import { getCurrentInstance, inject } from 'vue'
import { useI18n } from 'vue-i18n'
import { RouteLocationNormalizedLoaded } from 'vue-router'
import { ApplicationMessage, IHomeMessage } from '../models/application'
import { MilochauCoreOptions } from '../types'

export const useStore = defineStore('app', {
  state: () => ({
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
      const coreOptions = inject('core-options') as MilochauCoreOptions

      return (route: RouteLocationNormalizedLoaded) => {
        const routeName = route.name?.toString()
        const title = routeName ? i18n.t(`meta.${routeName}.title`, state.metaArgs) : undefined
        return title ? `${title} — ${coreOptions.application.name}` : coreOptions.application.name
      }
    },
    applicationDescription: (state) => {
      const i18n = useI18n()
      const coreOptions = inject('core-options') as MilochauCoreOptions

      return (route: RouteLocationNormalizedLoaded) => {
        const routeName = route.name?.toString()
        const description = routeName ? i18n.t(`meta.${routeName}.description`, state.metaArgs) : undefined
        return description ? `${description} — ${coreOptions.application.name}` : coreOptions.application.name
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
      console.log('----- APP STORE - CLEAN -----')
      //const coreOptions = inject('core-options') as MilochauCoreOptions
      //coreOptions.application.clean()
      //const mapsStore = useMapsStore()
      //mapsStore.clean()
    }
  }
})
