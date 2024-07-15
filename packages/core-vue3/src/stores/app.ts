import { mdiAlert, mdiAlertOctagon, mdiCheckboxMarkedCircle, mdiInformation } from '@mdi/js';
import { defineStore } from 'pinia';
import { type ApplicationMessage, type IHomeMessage, type PageData } from '../types/application';

/** App store state. */
interface AppStoreState {
  drawer: boolean,
  loading: boolean,
  snackbarMessage: ApplicationMessage,
  homeMessages: IHomeMessage[],
  pageData: PageData,
}

export const useAppStore = defineStore('app', {
  /** Store state. */
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
    /**
     * Display a message.
     * @param message Message to be displayed.
     */
    displayMessage(message: ApplicationMessage) {
      this.snackbarMessage = { creation: new Date().valueOf(), ...message };
    },
    /**
     * Display a message as information.
     * @param message Message to be displayed.
     * @param message.title Message title.
     * @param message.details Message details.
     * @param message.timeout_ms Message timeout in milliseconds.
     */
    displayInfoMessage(message: { title: string, details?: string, timeout_ms?: number }) {
      this.displayMessage({ title: message.title, color: 'info', details: message.details, timeout_ms: message.timeout_ms, icon: mdiInformation });
    },
    /**
     * Display a message as success.
     * @param message Message to be displayed.
     * @param message.title Message title.
     * @param message.details Message details.
     * @param message.timeout_ms Message timeout in milliseconds.
     */
    displaySuccessMessage(message: { title: string, details?: string, timeout_ms?: number }) {
      this.displayMessage({ title: message.title, color: 'success', details: message.details, timeout_ms: message.timeout_ms, icon: mdiCheckboxMarkedCircle });
    },
    /**
     * Display a message as warning.
     * @param message Message to be displayed.
     * @param message.title Message title.
     * @param message.details Message details.
     * @param message.timeout_ms Message timeout in milliseconds.
     */
    displayWarningMessage(message: { title: string, details?: string, timeout_ms?: number }) {
      this.displayMessage({ title: message.title, color: 'warning', details: message.details, timeout_ms: message.timeout_ms, icon: mdiAlertOctagon });
    },
    /**
     * Display a message as error.
     * @param message Message to be displayed.
     * @param message.title Message title.
     * @param message.details Message details.
     * @param message.timeout_ms Message timeout in milliseconds.
     */
    displayErrorMessage(message: { title: string, details?: string, timeout_ms?: number }) {
      this.displayMessage({ title: message.title, color: 'error', details: message.details, timeout_ms: message.timeout_ms, icon: mdiAlert });
    },
    /** Hide the displayed message. */
    hideMessage() {
      this.displayMessage({ title: '' });
    },
    /**
     * Set the navigation drawer to a specific state.
     * @param value Expected state of the navigation drawer.
     */
    setDrawer(value: boolean) {
      this.drawer = value;
    },
  },
});
