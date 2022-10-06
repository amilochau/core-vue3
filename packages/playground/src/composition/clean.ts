import { useMapsStore } from "../stores"

export function useClean() {

  const mapsStore = useMapsStore()

  const clean = () => {
    mapsStore.clean()
  }

  return {
    clean
  }
}
