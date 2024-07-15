import { defineStore } from 'pinia';

/** Notifications store state. */
interface NotificationsStoreState {
  registred: boolean
}

export const useNotificationsStore = defineStore('notifications', {
  /** Store state. */
  state: (): NotificationsStoreState => ({
    registred: false,
  }),
  persist: {
    storage: 'localStorage',
  },
});
