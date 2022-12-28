import { useIdentityStore } from "../stores";
import { useCoreOptions } from "./options";

export function useClean() {

  const coreOptions = useCoreOptions()
  const identityStore = useIdentityStore()
  const cleanFromCoreOptions = coreOptions.clean();

  const clean = () => {
    identityStore.clean();
    cleanFromCoreOptions();
  }

  return {
    clean
  }
}
