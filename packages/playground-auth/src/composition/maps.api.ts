import type { MapsListResponse } from "../types/maps"
import { useMapsStore } from "../stores"
import { ListRequest, type IListResult, type IDefaultCreateResponse } from "@amilochau/core-vue3/types";
import { useApi } from "@amilochau/core-vue3-auth/composition";

export const useMapsApi = () => {

  const api = useApi('/maps')

  const mapsStore = useMapsStore()

  const get = async () => {
    const request = new ListRequest<string>(mapsStore.search, mapsStore.lastKey)
    const query = request.getQuery();

    const response = await api.getHttp(`/down?${query}`, { redirect404: false })
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
    const reponse = await api.postHttp<MapsMarkersAddRequest>(`/${mapId}/markers`, request, { redirect404: false })
    await reponse.json() as IDefaultCreateResponse
  }

  const editMarker = async (mapId: string, markerId: string) => {
    const request = {
      name: 'test 2'
    }
    await api.postHttp<MapsMarkersChangeRequest>(`/${mapId}/markers/${markerId}`, request, { redirect404: false })
  }

  return {
    get,
    createMarker,
    editMarker
  }
}
