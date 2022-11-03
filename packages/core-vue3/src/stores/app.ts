import { mdiAlert, mdiAlertOctagon, mdiCheckboxMarkedCircle, mdiInformation } from '@mdi/js'
import { defineStore } from 'pinia'
import { ApplicationMessage, IHomeMessage } from '../types/application'

export const useStore = defineStore('app', {
  state: () => ({
    drawer: false,
    loading: false,
    message: new ApplicationMessage('', 'info', mdiInformation),
    homeMessages: new Array<IHomeMessage>()
  }),
  getters: {
    snackbarMessage: (state) => state.message
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
    }
  }
})
