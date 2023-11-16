import { useIdentityStore } from '../stores';
import { useCoreOptions } from './options';

export const useClean = () => {

  const coreOptions = useCoreOptions();
  const identityStore = useIdentityStore();
  const cleanFromCoreOptions = coreOptions.clean();

  return {
    clean: () => {
      identityStore.clean();
      cleanFromCoreOptions();
    },
  };
};
