import { mdiAlert, mdiAlertOctagon, mdiCheckboxMarkedCircle, mdiInformation } from '@mdi/js'
import { defineStore } from 'pinia'
import { type ApplicationMessage, type IHomeMessage, type PageData } from '../types/application'

interface AppStoreState {
  drawer: boolean,
  loading: boolean,
  message: ApplicationMessage,
  snackbarMessage: ApplicationMessage,
  homeMessages: IHomeMessage[],
  pageData: PageData,
}

export type MessageDestination = 'snackbar' | 'internal'

export const useAppStore = defineStore('app', {
  state: (): AppStoreState => ({
    drawer: false,
    loading: false,
    message: { title: '' },
    snackbarMessage: { title: '' },
    homeMessages: new Array<IHomeMessage>(),
    pageData: {
      title: '',
      description: '',
    },
  }),
  actions: {
    displayMessage(message: ApplicationMessage, destination: MessageDestination = 'snackbar') {
      switch (destination) {
        case 'snackbar':
          this.snackbarMessage = { creation: new Date().valueOf(), ...message }
          break;
        case 'internal':
          this.message = { creation: new Date().valueOf(), ...message }
          break;
      }
    },
    displayInfoMessage(message: { title: string, details?: string, timeout_ms?: number }, destination: MessageDestination = 'snackbar') {
      this.displayMessage({ title: message.title, color: 'info', details: message.details, timeout_ms: message.timeout_ms, icon: mdiInformation }, destination)
    },
    displaySuccessMessage(message: { title: string, details?: string, timeout_ms?: number }, destination: MessageDestination = 'snackbar') {
      this.displayMessage({ title: message.title, color: 'success', details: message.details, timeout_ms: message.timeout_ms, icon: mdiCheckboxMarkedCircle }, destination)
    },
    displayWarningMessage(message: { title: string, details?: string, timeout_ms?: number }, destination: MessageDestination = 'snackbar') {
      this.displayMessage({ title: message.title, color: 'warning', details: message.details, timeout_ms: message.timeout_ms, icon: mdiAlertOctagon }, destination)
    },
    displayErrorMessage(message: { title: string, details?: string, timeout_ms?: number }, destination: MessageDestination = 'snackbar') {
      this.displayMessage({ title: message.title, color: 'error', details: message.details, timeout_ms: message.timeout_ms, icon: mdiAlert }, destination)
    },
    hideMessage(destination: MessageDestination = 'snackbar') {
      this.displayMessage({ title: '' }, destination)
    },
    setDrawer(value: boolean) {
      this.drawer = value
    },
  },
})
