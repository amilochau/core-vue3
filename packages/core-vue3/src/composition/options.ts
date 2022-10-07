import { inject } from "vue"
import { MilochauCoreOptions } from "../types"

export function useCoreOptions() {
  const coreOptions = inject('core-options') as MilochauCoreOptions

  return coreOptions
}
