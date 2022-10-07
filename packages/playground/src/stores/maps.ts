import { defineStore } from 'pinia'
import { MapsListResponse, MapsOrderTypes } from '../types/maps'

function getDefaultState() {
  return {
    search: '',
    items: new Array<MapsListResponse>(),
    lastItems: new Array<MapsListResponse>(),
    orderType: MapsOrderTypes.Default,
    rows: 100,
    endReached: false
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
