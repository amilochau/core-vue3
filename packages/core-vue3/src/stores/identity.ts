import { defineStore } from 'pinia'

function getDefaultState() {
  return {
    isAuthenticated: false,
    attributes: {
      id: '',
      name: '',
      email: '',
    }
  }
}

export const useStore = defineStore('identity', {
  state: getDefaultState,
  actions: {
    setAttributes(attributes: {id: string, name: string, email: string}) {
      this.attributes = attributes
    },

    clean() {
      this.$patch(getDefaultState())
    }
  },
  persist: {
    storage: localStorage
  }
})
