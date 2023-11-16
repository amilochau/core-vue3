import { defineStore } from 'pinia';
import type { MapsListResponse } from '../types/maps';

const getDefaultState = () => {
  return {
    search: '',
    items: new Array<MapsListResponse>(),
    lastItems: new Array<MapsListResponse>(),
    endReached: false,
    lastKey: '' as string | undefined,
  };
};

export const useMapsStore = defineStore('maps', {
  state: getDefaultState,
  getters: {},
  actions: {
    clean() {
      this.$patch(getDefaultState());
    },
  },
  persist: {
    storage: 'localStorage',
  },
});
