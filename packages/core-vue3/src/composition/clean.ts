import { inject } from "vue"
import { MilochauCoreOptions } from "../types"

export function useClean() {

  const coreOptions = inject('core-options') as MilochauCoreOptions
  const cleanFromCoreOptions = coreOptions.clean();

  const clean = () => {
    cleanFromCoreOptions();
  }

  return {
    clean
  }
}
