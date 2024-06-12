import { mdiAlert, mdiAlertOctagon, mdiCheckboxMarkedCircle, mdiInformation } from '@mdi/js';
import { defineStore } from 'pinia';
import { type ApplicationMessage, type IHomeMessage, type PageData } from '../types/application';

interface AppStoreState {
  drawer: boolean,
  loading: boolean,
  snackbarMessage: ApplicationMessage,
  homeMessages: IHomeMessage[],
  pageData: PageData,
}

export const useAppStore = defineStore('app', {
  state: (): AppStoreState => ({
    drawer: false,
    loading: false,
    snackbarMessage: { title: '' },
    homeMessages: new Array<IHomeMessage>(),
    pageData: {
      title: '',
      description: '',
    },
  }),
  actions: {
    displayMessage(message: ApplicationMessage) {
      this.snackbarMessage = { creation: new Date().valueOf(), ...message };
    },
    displayInfoMessage(message: { title: string, details?: string, timeout_ms?: number }) {
      this.displayMessage({ title: message.title, color: 'info', details: message.details, timeout_ms: message.timeout_ms, icon: mdiInformation });
    },
    displaySuccessMessage(message: { title: string, details?: string, timeout_ms?: number }) {
      this.displayMessage({ title: message.title, color: 'success', details: message.details, timeout_ms: message.timeout_ms, icon: mdiCheckboxMarkedCircle });
    },
    displayWarningMessage(message: { title: string, details?: string, timeout_ms?: number }) {
      this.displayMessage({ title: message.title, color: 'warning', details: message.details, timeout_ms: message.timeout_ms, icon: mdiAlertOctagon });
    },
    displayErrorMessage(message: { title: string, details?: string, timeout_ms?: number }) {
      this.displayMessage({ title: message.title, color: 'error', details: message.details, timeout_ms: message.timeout_ms, icon: mdiAlert });
    },
    hideMessage() {
      this.displayMessage({ title: '' });
    },
    setDrawer(value: boolean) {
      this.drawer = value;
    },
  },
});
