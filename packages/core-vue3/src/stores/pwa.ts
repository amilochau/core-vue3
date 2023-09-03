import { defineStore } from 'pinia'

interface PwaStoreState {
  installDisplay: boolean,
  installPromptEvent?: any,
  updateDisplay: boolean,
  updateLoading: boolean,
  updateSW? : (reload?: boolean) => void,
}

export const usePwaStore = defineStore('pwa', {
  state: (): PwaStoreState => ({
    installDisplay: false,
    updateDisplay: false,
    updateLoading: false,
  }),
  actions: {
    install() {
      this.installPromptEvent?.prompt()
    },
    update() {
      this.updateLoading = true
      this.updateSW?.(true)
    },
  },
})
