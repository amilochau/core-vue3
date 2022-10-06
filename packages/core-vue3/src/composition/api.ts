import axios, { AxiosRequestConfig, AxiosResponse } from "axios"
import { IHttpSettings } from "../types/http"

export function useApi() {

  const processRequest = async <TResponse>(url: string,
    settings: IHttpSettings,
    request: (axiosUrl: string, axiosSettings: AxiosRequestConfig<any>)
      => Promise<AxiosResponse<TResponse, any>>) => {

  }

  const getHttp = async <TResponse>(url: string, settings: IHttpSettings) => {
    return processRequest(url, settings, (axiosUrl, axiosSettings) => axios.get<TResponse, AxiosResponse<TResponse>>(axiosUrl, axiosSettings))
  }

  const postHttp = async <TRequest, TResponse>(url: string, data: TRequest, settings: IHttpSettings) => {
    return processRequest(url, settings, (axiosUrl, axiosSettings) => axios.post<TResponse, AxiosResponse<TResponse>>(axiosUrl, data, axiosSettings))
  }

  const patchHttp = async <TRequest, TResponse>(url: string, data: TRequest, settings: IHttpSettings) => {
    return processRequest(url, settings, (axiosUrl, axiosSettings) => axios.patch<TResponse, AxiosResponse<TResponse>>(axiosUrl, data, axiosSettings))
  }

  const deleteHttp = async <TResponse>(url: string, settings: IHttpSettings) => {
    return processRequest(url, settings, (axiosUrl, axiosSettings) => axios.delete<TResponse, AxiosResponse<TResponse>>(axiosUrl, axiosSettings))
  }

  return {
    getHttp,
    postHttp,
    patchHttp,
    deleteHttp
  }
}
