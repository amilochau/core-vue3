import { IHttpSettings, IListRequest, IListResult } from "@amilochau/core-vue3";
import { PublicClientApplication } from "@azure/msal-browser";
import { Router } from "vue-router";
import { MapsListResponse, MapsOrderTypes } from "../models/maps";
import baseService from "./base.service";

class mapsService extends baseService {

  constructor(
    router: Router,
    msalInstance: PublicClientApplication) {
    super(router, msalInstance, '/maps')
  }

  public get(settings: IHttpSettings) {
    return this.getHttp<IListResult<MapsListResponse>>('', settings)
  }

  public getDown(request: IListRequest<string, MapsOrderTypes>, settings: IHttpSettings) {
    const query = request.getQuery();
    return this.getHttp<IListResult<MapsListResponse>>(`/down?${query}`, settings)
  }
}

export default mapsService
