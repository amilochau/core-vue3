import { inject } from 'vue';
import type { MilochauCoreOptions } from '../types';

/** Use core options. */
export const useCoreOptions = () => {
  /** Registration options. */
  const options = inject('core-options') as MilochauCoreOptions;

  /** Whether authentication is enabled. */
  const authenticationEnabled = !!options.identity;
  /** Whether API is enabled. */
  const apiEnabled = !!options.api;

  return {
    ...options,
    authenticationEnabled,
    apiEnabled,
  };
};
