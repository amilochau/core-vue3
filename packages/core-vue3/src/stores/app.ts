import { mdiAlert, mdiAlertOctagon, mdiCheckboxMarkedCircle, mdiInformation } from '@mdi/js'
import { defineStore } from 'pinia'
import { ApplicationMessage } from '../types/application'
import type { IHomeMessage } from '../types/application'

export const useStore = defineStore('app', {
  state: () => ({
    drawer: false,
    loading: false,
    message: new ApplicationMessage('', 'info', mdiInformation),
    snackbarMessage: new ApplicationMessage('', 'info', mdiInformation),
    homeMessages: new Array<IHomeMessage>()
  }),
  actions: {
    displayMessage(message: ApplicationMessage, displaySnackbar: boolean = true) {
      this.message = message
      if (displaySnackbar) {
        console.log('display snackbar')
        this.snackbarMessage = message
      }
    },
    displayInfoMessage(title: string, details?: string, displaySnackbar: boolean = true) {
      this.displayMessage(new ApplicationMessage(title, 'info', mdiInformation, details), displaySnackbar)
    },
    displaySuccessMessage(title: string, details?: string, displaySnackbar: boolean = true) {
      this.displayMessage(new ApplicationMessage(title, 'success', mdiCheckboxMarkedCircle, details), displaySnackbar)
    },
    displayWarningMessage(title: string, details?: string, displaySnackbar: boolean = true) {
      this.displayMessage(new ApplicationMessage(title, 'warning', mdiAlertOctagon, details), displaySnackbar)
    },
    displayErrorMessage(title: string, details?: string, displaySnackbar: boolean = true) {
      this.displayMessage(new ApplicationMessage(title, 'error', mdiAlert, details), displaySnackbar)
    },
    setDrawer(value: boolean) {
      this.drawer = value
    }
  }
})
