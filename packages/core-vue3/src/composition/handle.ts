import type { ApplicationMessage } from "../types";
import { useOnline } from "@vueuse/core";
import { storeToRefs } from "pinia";
import type { Ref } from "vue";
import { useAppStore } from "../stores";

export function useHandle() {

  const appStore = useAppStore()
  const online = useOnline()
  const { loading } = storeToRefs(appStore)

  const handleFormValidation = async (form: Ref<any>) => {
    if (loading.value || !online.value) {
      return false;
    }

    const { valid } = await form.value!.validate()
    if (!valid) {
      return false;
    }

    return true;
  }

  const handleLoad = async <TResponse>(request: () => Promise<TResponse>) => {
    try {
      appStore.loading = true
      return await request();
    } finally {
      appStore.loading = false
    }
  }

  const handleError = async <TResponse>(request: () => Promise<TResponse>, destination: 'snackbar' | 'internal') => {
    try {
      return await request();
    } catch (error) {
      const applicationMessage = error as ApplicationMessage
      appStore.displayMessage(applicationMessage, destination)
    }
  }

  const handleLoadAndError = async <TResponse>(request: () => Promise<TResponse>, destination: 'snackbar' | 'internal') => {
    return handleLoad(() => handleError(request, destination))
  }

  return {
    handleLoad,
    handleError,
    handleLoadAndError,
    handleFormValidation,
  }
}
