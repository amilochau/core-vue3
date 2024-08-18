import { mdiAlert, mdiAlertOctagon, mdiCheckboxMarkedCircle, mdiInformation } from '@mdi/js';
import { defineStore } from 'pinia';
import { type ApplicationMessage, type IHomeMessage, type PageData } from '../types/application';
import { ref } from 'vue';

export const useAppStore = defineStore('app', () => {
  const drawer = ref(false);
  const loading = ref(false);
  const snackbarMessage = ref<ApplicationMessage>({ title: '' });
  const homeMessages = ref<IHomeMessage[]>([]);
  const pageData = ref<PageData>({ title: '', description: '' });

  /**
   * Display a message.
   * @param message Message to be displayed.
   */
  const displayMessage = (message: ApplicationMessage) => {
    snackbarMessage.value = { creation: new Date().valueOf(), ...message };
  };

  /**
   * Display a message as information.
   * @param message Message to be displayed.
   * @param message.title Message title.
   * @param message.details Message details.
   * @param message.timeout_ms Message timeout in milliseconds.
   */
  const displayInfoMessage = (message: { title: string, details?: string, timeout_ms?: number }) => {
    displayMessage({ title: message.title, color: 'info', details: message.details, timeout_ms: message.timeout_ms, icon: mdiInformation });
  };

  /**
   * Display a message as success.
   * @param message Message to be displayed.
   * @param message.title Message title.
   * @param message.details Message details.
   * @param message.timeout_ms Message timeout in milliseconds.
   */
  const displaySuccessMessage = (message: { title: string, details?: string, timeout_ms?: number }) => {
    displayMessage({ title: message.title, color: 'success', details: message.details, timeout_ms: message.timeout_ms, icon: mdiCheckboxMarkedCircle });
  };

  /**
   * Display a message as warning.
   * @param message Message to be displayed.
   * @param message.title Message title.
   * @param message.details Message details.
   * @param message.timeout_ms Message timeout in milliseconds.
   */
  const displayWarningMessage = (message: { title: string, details?: string, timeout_ms?: number }) => {
    displayMessage({ title: message.title, color: 'warning', details: message.details, timeout_ms: message.timeout_ms, icon: mdiAlertOctagon });
  };

  /**
   * Display a message as error.
   * @param message Message to be displayed.
   * @param message.title Message title.
   * @param message.details Message details.
   * @param message.timeout_ms Message timeout in milliseconds.
   */
  const displayErrorMessage = (message: { title: string, details?: string, timeout_ms?: number }) => {
    displayMessage({ title: message.title, color: 'error', details: message.details, timeout_ms: message.timeout_ms, icon: mdiAlert });
  };

  /** Hide the displayed message. */
  const hideMessage = () => {
    displayMessage({ title: '' });
  };

  /**
   * Set the navigation drawer to a specific state.
   * @param value Expected state of the navigation drawer.
   */
  const setDrawer = (value: boolean) => {
    drawer.value = value;
  };

  return {
    drawer,
    loading,
    snackbarMessage,
    homeMessages,
    pageData,

    displayMessage,
    displayInfoMessage,
    displaySuccessMessage,
    displayWarningMessage,
    displayErrorMessage,
    hideMessage,
    setDrawer,
  };
});
