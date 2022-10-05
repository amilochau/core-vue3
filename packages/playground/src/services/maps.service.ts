import { PublicClientApplication } from "@azure/msal-browser";
import { Router } from "vue-router";
import { MapsListResponse, MapsOrderTypes } from "../models/business/maps";
import { IHttpSettings } from "../models/http";
import { IListRequest, IListResult } from "../models/http/ListPayload";
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
