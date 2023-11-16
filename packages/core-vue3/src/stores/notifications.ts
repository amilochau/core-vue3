import { defineStore } from 'pinia';

interface NotificationsStoreState {
  registred: boolean
}

export const useNotificationsStore = defineStore('notifications', {
  state: (): NotificationsStoreState => ({
    registred: false,
  }),
  persist: {
    storage: 'localStorage',
  },
});
