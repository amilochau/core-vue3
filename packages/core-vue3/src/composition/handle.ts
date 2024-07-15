import { useOnline } from '@vueuse/core';
import { storeToRefs } from 'pinia';
import type { Ref } from 'vue';
import { useAppStore } from '../stores';
import { mdiAlert } from '@mdi/js';
import { useI18n } from 'vue-i18n';
import type { ApplicationMessage } from '../types';

/** Use handle. */
export const useHandle = () => {

  const { t, mergeLocaleMessage } = useI18n();
  const appStore = useAppStore();
  const online = useOnline();
  const { loading } = storeToRefs(appStore);

  mergeLocaleMessage('en', {
    internalError: {
      title: 'Internal error',
      desc: 'You can\'t do anything, it\'s a bug...',
    },
  });
  mergeLocaleMessage('fr', {
    internalError: {
      title: 'Erreur interne',
      desc: 'Vous ne pouvez rien faire, il s\'agit d\'un bug...',
    },
  });

  /** Validatable form. */
  type ValidatableForm = {
    validate: () => Promise<{
      valid: boolean;
      errors: {
          id: string | number;
          errorMessages: string[];
      }[];
    }>
  };

  /**
   * Handle form validation.
   * @param form Form values.
   */
  const handleFormValidation = async <TForm extends ValidatableForm>(form: Ref<TForm | undefined>) => {
    if (loading.value || !online.value || !form.value) {
      return false;
    }

    const { valid } = await form.value.validate();
    return valid;
  };

  /**
   * Handle load.
   * @param request Request to be executed.
   * @param loading Loading reactive value.
   */
  const handleLoad = async <TResponse>(request: () => Promise<TResponse>, loading?: Ref<boolean>) => {
    try {
      if (loading) {
        loading.value = true;
      } else {
        appStore.loading = true;
      }
      return await request();
    } finally {
      if (loading) {
        loading.value = false;
      } else {
        appStore.loading = false;
      }
    }
  };

  /**
   * Handle error.
   * @param request Request to be executed.
   * @param callback Callback to be executed to display error message.
   */
  const handleError = async <TResponse>(request: () => Promise<TResponse>, callback?: (message: ApplicationMessage) => any) => {
    try {
      return await request();
    } catch (error: any) {
      const message: ApplicationMessage = {
        title: error.title ?? t('internalError.title'),
        color: error.color ?? 'error',
        icon: error.icon ?? mdiAlert,
        details: error.details ?? (error.title ? undefined : t('internalError.desc')),
        timeout_ms: error.timeout_ms,
      };

      if (callback) {
        callback(message);
      } else {
        appStore.displayMessage(message);
      }
    }
  };

  /**
   * Combinaison of @see handleLoad and @see handleError.
   * @param request Request to be executed.
   * @param callback Callback to be executed to display error message.
   * @param loading Loading reactive value.
   */
  const handleLoadAndError = async <TResponse>(request: () => Promise<TResponse>, callback?: (message: ApplicationMessage) => any, loading?: Ref<boolean>) => {
    return handleLoad(() => handleError(request, callback), loading);
  };

  return {
    handleLoad,
    handleError,
    handleLoadAndError,
    handleFormValidation,
  };
};
