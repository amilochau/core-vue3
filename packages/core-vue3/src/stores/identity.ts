import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useIdentityStore = defineStore('identity', () => {
  const isAuthenticated = ref(false);
  const attributes = ref({
    sub: '',
    name: '',
    email: '',
    user_id: '',
  });

  /**
   * Set identity attributes.
   * @param attrs Identity attributes.
   * @param attrs.sub Attribute `sub`.
   * @param attrs.name Attribute `name`.
   * @param attrs.email Attribute `email`.
   * @param attrs.user_id Attribute `user_id`.
   */
  const setAttributes = (attrs: { sub: string, name: string, email: string, user_id: string }) => {
    attributes.value = attrs;
  };

  /** Clean store. */
  const $reset = () => {
    isAuthenticated.value = false;
    attributes.value = {
      sub: '',
      name: '',
      email: '',
      user_id: '',
    };
  };

  return {
    isAuthenticated,
    attributes,
    setAttributes,
    $reset,
  };
}, {
  persist: {
    storage: 'localStorage',
  },
});
