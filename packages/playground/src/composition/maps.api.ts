import { MapsListResponse, MapsOrderTypes, MapsSearchKeys } from "../types/maps"
import { useMapsStore } from "../stores"
import { useApi, ListRequest, IListResult } from "@amilochau/core-vue3";

export function useMapsApi() {

  const api = useApi('/maps')

  const mapsStore = useMapsStore()

  const get = async () => {
    const request = new ListRequest<string, MapsOrderTypes>(mapsStore.rows, { [MapsSearchKeys.Default]: mapsStore.search }, mapsStore.orderType)
    const query = request.getQuery();

    const apiResult = await api.getHttp<IListResult<MapsListResponse>>(`/down?${query}`, { load: true, errors: true, redirect404: false })

    mapsStore.items = apiResult.items
    mapsStore.endReached = apiResult.endReached
  }

  return {
    get
  }
}
