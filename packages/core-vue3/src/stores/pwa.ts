import { defineStore } from 'pinia';
import { ref } from 'vue';

export const usePwaStore = defineStore('pwa', () => {
  const installDisplay = ref(false);
  const installPromptEvent = ref<any>();
  const updateDisplay = ref(false);
  const updateLoading = ref(false);
  const updateSW = ref<(reload?: boolean) => void>();

  /** Install PWA application. */
  const install = () => {
    installPromptEvent.value?.prompt();
  };

  /** Update PWA application. */
  const update = () => {
    updateLoading.value = true;
    updateSW.value?.(true);
  };

  return {
    installDisplay,
    installPromptEvent,
    updateDisplay,
    updateLoading,
    updateSW,

    install,
    update,
  };
});
