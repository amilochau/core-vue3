import { InteractionRequiredAuthError, PublicClientApplication } from "@azure/msal-browser"
import { mdiAccessPointNetworkOff, mdiAlert } from "@mdi/js"
import axios, { AxiosError, AxiosRequestConfig, AxiosRequestHeaders, AxiosResponse } from "axios"
import { Store } from "pinia"
import { Router } from "vue-router"
import { ApplicationMessage, IHttpSettings, IProblemDetails, useAppStore } from "@amilochau/core-vue3"
import { loginRequest } from "../data/config"
import { getConfig } from "../utils/config";

abstract class baseService {

  private appStore: Store<any, any, any, any>
  private router: Router
  private baseUri: string
  private msalInstance: PublicClientApplication

  constructor(
    router: Router,
    msalInstance: PublicClientApplication,
    relativeBaseUri: string) {
    this.router = router
    this.appStore = useAppStore()
    this.msalInstance = msalInstance
    this.baseUri = `${getConfig('VITE_API_URL')}${relativeBaseUri}`
  }

  protected async getHttp<TResponse>(url: string, settings: IHttpSettings) {
    return this.processRequest(url, settings, (axiosUrl, axiosSettings) => axios.get<TResponse, AxiosResponse<TResponse>>(axiosUrl, axiosSettings))
  }

  protected async postHttp<TRequest, TResponse>(url: string, data: TRequest, settings: IHttpSettings) {
    return this.processRequest(url, settings, (axiosUrl, axiosSettings) => axios.post<TResponse, AxiosResponse<TResponse>>(axiosUrl, data, axiosSettings))
  }

  protected deleteHttp<TResponse>(url: string, settings: IHttpSettings) {
    return this.processRequest(url, settings, (axiosUrl, axiosSettings) => axios.delete<TResponse, AxiosResponse<TResponse>>(axiosUrl, axiosSettings))
  }

  private async processRequest<TResponse>(
    url: string,
    settings: IHttpSettings,
    request: (axiosUrl: string, axiosSettings: AxiosRequestConfig<any>
  ) => Promise<AxiosResponse<TResponse, any>>) {
    try {
      // Start loading
      if (settings.load) { this.appStore.loading = true }

      // Get bearer token for API
      var accessToken = '';

      if (this.router.currentRoute.value.meta.anonymousRequests) {
        // The user is not logged in but we don't mind
      } else {
        const authResponse = await this.msalInstance.acquireTokenSilent({
          ...loginRequest
        }).catch(async (e) => {
          if (e instanceof InteractionRequiredAuthError) {
            await this.msalInstance.acquireTokenRedirect(loginRequest)
          }
          throw e
        })
        accessToken = authResponse.accessToken
      }

      const axiosSettings = this.getAxiosSettings(accessToken);
      const axiosUrl = this.getAxiosUrl(url);
      const result = await request(axiosUrl, axiosSettings);
      return result.data
    } catch (error) {
      const errorMessage = await this.analyzeError(error, settings)
      if (settings.errors) { this.appStore.displayMessage(errorMessage) }
      throw errorMessage;
    } finally {
      if (settings.load) { this.appStore.loading = false }
    }
  }

  private async analyzeError(error: any, settings: IHttpSettings): Promise<ApplicationMessage> {
    if (this.isAxiosError<any>(error)) {
      if (error.response.status === 401) {
        this.router.push({ name: 'Home' })
        return new ApplicationMessage('app.errors.notAuthorized', 'error', mdiAlert)
      } else if (error.response.status === 403) {
        this.router.push({ name: 'Forbidden' })
        return new ApplicationMessage('app.errors.notAuthorized', 'error', mdiAlert)
      } else if (error.response.status === 404) {
        if (settings.redirect404) {
          this.router.push({ name: 'NotFound' })
        }
        return new ApplicationMessage('app.errors.notFound', 'error', mdiAlert)
      } else if (error.response.status === 400) {
        if (this.isAxiosError<IProblemDetails>(error)) {
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

  private isAxiosError<TResponse>(error: any): error is AxiosError<TResponse> & { response: AxiosResponse<TResponse> } {
    return (error as AxiosError<TResponse>).response !== undefined
  }

  private getAxiosUrl(url: string) {
    return `${this.baseUri}${url}`
  }

  private getAxiosSettings(accessToken: string): AxiosRequestConfig {
    const headers: AxiosRequestHeaders = {};
    if (accessToken) {
      headers.Authorization = `Bearer ${accessToken}`
    }
    return { headers }
  }
}

export default baseService
