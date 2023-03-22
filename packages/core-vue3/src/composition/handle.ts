import { ApplicationMessage } from "../types";
import { useOnline } from "@vueuse/core";
import { storeToRefs } from "pinia";
import type { Ref } from "vue";
import { useAppStore } from "../stores";
import { mdiAlert } from "@mdi/js";
import { useI18n } from "vue-i18n";

export function useHandle() {

  const { t, mergeLocaleMessage } = useI18n()
  const appStore = useAppStore()
  const online = useOnline()
  const { loading } = storeToRefs(appStore)

  mergeLocaleMessage('en', {
    internalError: {
      title: 'Internal error',
      desc: "You can't do anything, it's a bug..."
    }
  })
  mergeLocaleMessage('fr', {
    internalError: {
      title: 'Erreur interne',
      desc: "Vous ne pouvez rien faire, il s'agit d'un bug..."
    }
  })

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
      if (error instanceof ApplicationMessage) {
        appStore.displayMessage(error as ApplicationMessage, destination)
      } else {
        console.error(error)
        appStore.displayMessage(new ApplicationMessage(t('internalError.title'), 'error', mdiAlert, t('internalError.desc')), destination)
      }
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
