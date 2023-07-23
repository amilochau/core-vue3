import { defineStore } from 'pinia'

const getDefaultState = () => {
  return {
    isAuthenticated: false,
    attributes: {
      id: '',
      name: '',
      email: '',
    },
    onLogout: async () => {},
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
    },

    logout() {
      return this.onLogout();
    },
  },
  persist: {
    storage: localStorage
  }
})
