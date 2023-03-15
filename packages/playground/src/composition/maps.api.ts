import type { MapsListResponse } from "../types/maps"
import { useMapsStore } from "../stores"
import { useApi, ListRequest } from "@amilochau/core-vue3";
import type { IListResult, IDefaultCreateResponse } from "@amilochau/core-vue3";

export function useMapsApi() {

  const api = useApi('/maps')

  const mapsStore = useMapsStore()

  const get = async () => {
    const request = new ListRequest<string>(mapsStore.search, mapsStore.lastKey)
    const query = request.getQuery();

    const response = await api.getHttp(`/down?${query}`, { errors: true, redirect404: false })
    const apiResult = await response.json() as IListResult<MapsListResponse, string>

    mapsStore.items = apiResult.items
    mapsStore.endReached = apiResult.endReached
    mapsStore.lastKey = apiResult.lastKey
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
    const reponse = await api.postHttp<MapsMarkersAddRequest>(`/${mapId}/markers`, request, { errors: true, redirect404: false })
    await reponse.json() as IDefaultCreateResponse
  }

  const editMarker = async (mapId: string, markerId: string) => {
    const request = {
      name: 'test 2'
    }
    await api.postHttp<MapsMarkersChangeRequest>(`/${mapId}/markers/${markerId}`, request, { errors: true, redirect404: false })
  }

  return {
    get,
    createMarker,
    editMarker
  }
}
