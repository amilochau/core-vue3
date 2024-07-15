import { defineStore } from 'pinia';

/** PWA store state. */
interface PwaStoreState {
  installDisplay: boolean,
  installPromptEvent?: any,
  updateDisplay: boolean,
  updateLoading: boolean,
  updateSW? : (reload?: boolean) => void,
}

export const usePwaStore = defineStore('pwa', {
  /** Store state. */
  state: (): PwaStoreState => ({
    installDisplay: false,
    updateDisplay: false,
    updateLoading: false,
  }),
  actions: {
    /** Install PWA application. */
    install() {
      this.installPromptEvent?.prompt();
    },
    /** Update PWA application. */
    update() {
      this.updateLoading = true;
      this.updateSW?.(true);
    },
  },
});
