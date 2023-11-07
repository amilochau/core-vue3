import { mdiAlert, mdiAlertOctagon, mdiCheckboxMarkedCircle, mdiInformation } from '@mdi/js'
import { defineStore } from 'pinia'
import { ApplicationMessage, type IHomeMessage, type PageData } from '../types/application'

interface AppStoreState {
  drawer: boolean,
  loading: boolean,
  message: ApplicationMessage,
  snackbarMessage: ApplicationMessage,
  homeMessages: IHomeMessage[],
  pageData: PageData,
}

export const useAppStore = defineStore('app', {
  state: (): AppStoreState => ({
    drawer: false,
    loading: false,
    message: new ApplicationMessage('', 'info', mdiInformation),
    snackbarMessage: new ApplicationMessage('', 'info', mdiInformation),
    homeMessages: new Array<IHomeMessage>(),
    pageData: {
      title: '',
      description: '',
    },
  }),
  actions: {
    displayMessage(message: ApplicationMessage, destination: 'snackbar' | 'internal' = 'snackbar') {
      switch (destination) {
        case 'snackbar':
          this.snackbarMessage = message
          break;
        case 'internal':
          this.message = message
          break;
      }
    },
    displayInfoMessage(title: string, details?: string, destination: 'snackbar' | 'internal' = 'snackbar') {
      this.displayMessage(new ApplicationMessage(title, 'info', mdiInformation, details), destination)
    },
    displaySuccessMessage(title: string, details?: string, destination: 'snackbar' | 'internal' = 'snackbar') {
      this.displayMessage(new ApplicationMessage(title, 'success', mdiCheckboxMarkedCircle, details), destination)
    },
    displayWarningMessage(title: string, details?: string, destination: 'snackbar' | 'internal' = 'snackbar') {
      this.displayMessage(new ApplicationMessage(title, 'warning', mdiAlertOctagon, details), destination)
    },
    displayErrorMessage(title: string, details?: string, destination: 'snackbar' | 'internal' = 'snackbar') {
      this.displayMessage(new ApplicationMessage(title, 'error', mdiAlert, details), destination)
    },
    hideMessage(destination: 'snackbar' | 'internal' = 'snackbar') {
      this.displayMessage(new ApplicationMessage('', 'info', mdiInformation), destination)
    },
    setDrawer(value: boolean) {
      this.drawer = value
    }
  }
})
