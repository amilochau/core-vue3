import { MapsListResponse, MapsOrderTypes, MapsSearchKeys } from "../types/maps"
import { useMapsStore } from "../stores"
import { useApi, ListRequest, IListResult, IDefaultCreateResponse } from "@amilochau/core-vue3";

export function useMapsApi() {

  const api = useApi('/maps')

  const mapsStore = useMapsStore()

  const get = async () => {
    const request = new ListRequest<string, MapsOrderTypes>(mapsStore.rows, { [MapsSearchKeys.Default]: mapsStore.search }, mapsStore.orderType)
    const query = request.getQuery();

    const response = await api.getHttp(`/down?${query}`, { load: true, errors: true, redirect404: false })
    const apiResult = await response.json() as IListResult<MapsListResponse>

    mapsStore.items = apiResult.items
    mapsStore.endReached = apiResult.endReached
  }

  type MapsMarkersAddRequest = {
    name: string
  }

  type MapsMarkersChangeRequest = {
    name: string
  }

  const createMarker = async (mapId: string) => {
    const request = {
      name: 'test'
    }
    const reponse = await api.postHttp<MapsMarkersAddRequest>(`/${mapId}/markers`, request, { load: true, errors: true, redirect404: false })
    await reponse.json() as IDefaultCreateResponse
  }

  const editMarker = async (mapId: string, markerId: string) => {
    const request = {
      name: 'test 2'
    }
    await api.postHttp<MapsMarkersChangeRequest>(`/${mapId}/markers/${markerId}`, request, { load: true, errors: true, redirect404: false })
  }

  return {
    get,
    createMarker,
    editMarker
  }
}
