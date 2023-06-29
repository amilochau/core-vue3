import { defineStore } from 'pinia'
import type { MapsListResponse } from '../types/maps'

function getDefaultState() {
  return {
    search: '',
    items: new Array<MapsListResponse>(),
    lastItems: new Array<MapsListResponse>(),
    endReached: false,
    lastKey: '' as string | undefined,
  }
}

export const useStore = defineStore('maps', {
  state: getDefaultState,
  getters: {},
  actions: {
    clean() {
      this.$patch(getDefaultState())
    }
  },
  persist: {
    storage: localStorage
  }
})
