import { useIdentityStore } from '../stores';
import { useAppOptions } from './options';

/** Use clean. */
export const useClean = () => {

  const { coreOptions } = useAppOptions();
  const identityStore = useIdentityStore();
  const cleanFromCoreOptions = coreOptions.clean();

  return {
    /** Clean stores and cookies. */
    clean: () => {
      identityStore.clean();
      cleanFromCoreOptions();

      const exceptions = [
        'cookies',
      ];

      const localStorageKeys = Object.keys(localStorage);
      localStorageKeys.forEach((key) => {
        if (!exceptions.includes(key)) {
          localStorage.removeItem(key);
        }
      });
    },
  };
};
