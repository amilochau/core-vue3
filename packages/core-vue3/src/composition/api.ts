import { InteractionRequiredAuthError } from "@azure/msal-browser"
import { mdiAccessPointNetworkOff, mdiAlert } from "@mdi/js"
import axios, { AxiosError, AxiosRequestConfig, AxiosResponse, RawAxiosRequestHeaders } from "axios"
import { useRouter } from "vue-router"
import { useAppStore } from "../stores"
import { ApplicationMessage } from "../types"
import { IHttpSettings, IProblemDetails } from "../types/http"
import { useMsal } from "./msal"
import { useCoreOptions } from "./options"

export function useApi(relativeBaseUri: string) {

  const appStore = useAppStore()
  const msal = useMsal()
  const router = useRouter();
  const coreOptions = useCoreOptions()
  const baseUri = `${coreOptions.api.gatewayUri}${relativeBaseUri}`
  
  const analyzeError = async (error: any, settings: IHttpSettings): Promise<ApplicationMessage> => {
    if (isAxiosError<any>(error)) {
      if (error.response.status === 401) {
        router.push({ name: 'Home' })
        return new ApplicationMessage('app.errors.notAuthorized', 'error', mdiAlert)
      } else if (error.response.status === 403) {
        router.push({ name: 'Forbidden' })
        return new ApplicationMessage('app.errors.notAuthorized', 'error', mdiAlert)
      } else if (error.response.status === 404) {
        if (settings.redirect404) {
          router.push({ name: 'NotFound' })
        }
        return new ApplicationMessage('app.errors.notFound', 'error', mdiAlert)
      } else if (error.response.status === 400) {
        if (isAxiosError<IProblemDetails>(error)) {
          const errorMessage = new ApplicationMessage('', 'error', mdiAlert, undefined, undefined, true)
          if (error.response.data && error.response.data.title) {
            errorMessage.title = error.response.data.title
          }
          if (error.response.data && error.response.data.errors) {
            errorMessage.details = ''
            for (const [key, values] of Object.entries(error.response.data.errors)) {
              for (const value of values) {
                if (value) {
                  if (key) {
                    errorMessage.details += `${key} - ${value}\n`
                  } else {
                    errorMessage.details += `${value}\n`
                  }
                }
              }
            }
          }
          // Format
          if (errorMessage.title.length) {
            return errorMessage
          }
        }
      } else if (error.response.status === 500) {
        return new ApplicationMessage('app.errors.serverError', 'error', mdiAlert)
      } else if (error.response.headers && error.response.headers['Application-Error']) {
        return new ApplicationMessage(error.response.headers['Application-Error'], 'error', mdiAlert, undefined, undefined, true)
      }
    } else if (error.request) {
      return new ApplicationMessage('app.errors.networkError', 'warning', mdiAccessPointNetworkOff)
    } else {
      // Something happened in setting up the request that triggered an Error
    }
    return new ApplicationMessage('app.errors.serverError', 'error', mdiAlert)
  }

  const isAxiosError = <TResponse>(error: any): error is AxiosError<TResponse> & { response: AxiosResponse<TResponse> } => {
    return (error as AxiosError<TResponse>).response !== undefined
  }

  const getAxiosUrl = (url: string) => {
    return `${baseUri}${url}`
  }

  const getAxiosSettings = (accessToken: string): AxiosRequestConfig => {
    const headers: RawAxiosRequestHeaders = {};
    if (accessToken) {
      headers.Authorization = `Bearer ${accessToken}`
    }
    return { headers }
  }

  const processRequest = async <TResponse>(url: string,
    settings: IHttpSettings,
    request: (axiosUrl: string, axiosSettings: AxiosRequestConfig<any>)
      => Promise<AxiosResponse<TResponse, any>>) => {

    try {
      // Start loading
      if (settings.load) { appStore.loading = true }

      // Get bearer token for API
      var accessToken = '';

      if (router.currentRoute.value.meta.anonymousRequests) {
        // The user is not logged in but we don't mind
      } else {
        const authResponse = await msal.instance.acquireTokenSilent({
          ...coreOptions.identity.loginRequest
        }).catch(async (e) => {
          if (e instanceof InteractionRequiredAuthError) {
            await msal.instance.acquireTokenRedirect(coreOptions.identity.loginRequest)
          }
          throw e
        })
        accessToken = authResponse.accessToken
      }

      const axiosSettings = getAxiosSettings(accessToken);
      const axiosUrl = getAxiosUrl(url);
      const result = await request(axiosUrl, axiosSettings);
      return result.data
    } catch (error) {
      const errorMessage = await analyzeError(error, settings)
      if (settings.errors) { appStore.displayMessage(errorMessage) }
      throw errorMessage;
    } finally {
      if (settings.load) { appStore.loading = false }
    }
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
