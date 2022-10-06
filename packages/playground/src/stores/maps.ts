import { defineStore } from 'pinia'
import { getCurrentInstance } from 'vue'
import { MapsListResponse, MapsOrderTypes } from '../models/maps'

const internalInstance = getCurrentInstance();

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
      // TEST NOW
      console.log('===== CLEAN MAPS STORE =====')
      console.log(internalInstance)
      
      //this.$patch(getDefaultState())
    }
  },
  persist: {
    storage: localStorage
  }
})
