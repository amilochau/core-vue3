import { useOnline } from "@vueuse/core";
import { storeToRefs } from "pinia";
import type { Ref } from "vue";
import { useAppStore } from "../stores";
import { mdiAlert } from "@mdi/js";
import { useI18n } from "vue-i18n";

export const useHandle = () => {

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

  type ValidatableForm = {
    validate: () => Promise<{
      valid: boolean;
      errors: {
          id: string | number;
          errorMessages: string[];
      }[];
    }>
  }

  const handleFormValidation = async <TForm extends ValidatableForm>(form: Ref<TForm | undefined>) => {
    if (loading.value || !online.value || !form.value) {
      return false;
    }

    const { valid } = await form.value.validate()
    return valid;
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
    } catch (error: any) {
      appStore.displayMessage({
        title: error.title ?? t('internalError.title'),
        color: error.color ?? 'error',
        icon: error.icon ?? mdiAlert,
        details: error.details ?? t('internalError.desc'),
        timeout_ms: error.timeout_ms,
      }, destination)
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
