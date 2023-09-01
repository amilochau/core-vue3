import { defineStore } from 'pinia'

interface PwaStoreState {
  display: boolean,
  loading: boolean,
  updateSW: null | ((reload?: boolean) => void)
}

export const usePwaStore = defineStore('pwa', {
  state: (): PwaStoreState => ({
    display: false,
    loading: false,
    updateSW: null,
  }),
  actions: {
    ignore() {
      this.display = false
    },
    update() {
      this.display = false
      this.loading = true
      this.updateSW?.(true)
    },
  },
})
