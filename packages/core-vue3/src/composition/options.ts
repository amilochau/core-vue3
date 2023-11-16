import { inject } from 'vue';
import type { MilochauCoreOptions } from '../types';

export const useCoreOptions = () => {
  const options = inject('core-options') as MilochauCoreOptions;

  const authenticationEnabled = !!options.identity;
  const apiEnabled = !!options.api;

  return {
    ...options,
    authenticationEnabled,
    apiEnabled,
  };
};
