import { defineStore } from 'pinia'

const getDefaultState = (): IdentityStoreState => {
  return {
    isAuthenticated: false,
    attributes: {
      id: '',
      name: '',
      email: '',
    },
  }
}

interface IdentityStoreState {
  isAuthenticated: boolean,
  attributes: {
    id: string,
    name: string,
    email: string,
  },
}

export const useIdentityStore = defineStore('identity', {
  state: getDefaultState,
  actions: {
    setAttributes(attributes: {id: string, name: string, email: string}) {
      this.attributes = attributes
    },

    clean() {
      this.$patch(getDefaultState())
    },
  },
  persist: {
    storage: 'localStorage'
  }
})
