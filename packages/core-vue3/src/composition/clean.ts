import { useCoreOptions } from "./options";

export function useClean() {

  const coreOptions = useCoreOptions()
  const cleanFromCoreOptions = coreOptions.clean();

  const clean = () => {
    cleanFromCoreOptions();
  }

  return {
    clean
  }
}
