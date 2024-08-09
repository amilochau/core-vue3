import { inject } from 'vue';
import type { CoreOptions, EnvironmentOptions } from '../types';

/** Use app options. */
export const useAppOptions = () => {
  /** Registration options. */
  const coreOptions = inject('core-options') as CoreOptions;
  const environmentOptions = inject('environment-options') as EnvironmentOptions;

  /** Whether authentication is enabled. */
  const authenticationEnabled = !!coreOptions.identity;
  /** Whether API is enabled. */
  const apiEnabled = !!coreOptions.api;

  return {
    coreOptions,
    environmentOptions,
    authenticationEnabled,
    apiEnabled,
  };
};
