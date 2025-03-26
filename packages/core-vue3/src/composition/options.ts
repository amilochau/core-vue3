import { inject } from 'vue';
import type { CoreOptions } from '../types';

/** Use app options. */
export const useAppOptions = () => {
  /** Registration options. */
  const coreOptions = inject('core-options') as CoreOptions;

  /** Whether API is enabled. */
  const apiEnabled = !!coreOptions.api;

  return {
    coreOptions,
    apiEnabled,
  };
};
