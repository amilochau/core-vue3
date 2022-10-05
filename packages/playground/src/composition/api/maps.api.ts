import { MapsListResponse, MapsOrderTypes, MapsSearchKeys } from "../../models/business/maps"
import { IListResult, ListRequest } from "../../models/http/ListPayload"
import { useMapsStore } from "../../stores"
import { useRouter } from 'vue-router';
import { msalInstance, useApi } from "@amilochau/core-vue3";
import { mapsService } from "../../services";

export function useMapsApi() {

  const api = useApi()

  const mapsStore = useMapsStore()
  const router = useRouter()

  const get = async () => {
    const request = new ListRequest<string, MapsOrderTypes>(mapsStore.rows, { [MapsSearchKeys.Default]: mapsStore.search }, mapsStore.orderType)
    const query = request.getQuery();
    
    //const apiResult = api.getHttp<IListResult<MapsListResponse>>(`/down?${query}`, { load: true, errors: true, redirect404: false })


    const service = new mapsService(router, msalInstance)
    const apiResult = await service.getDown(request, { load: true, errors: true, redirect404: false })
    mapsStore.items = apiResult.items
    mapsStore.endReached = apiResult.endReached
  }

  return {
    get
  }
}
