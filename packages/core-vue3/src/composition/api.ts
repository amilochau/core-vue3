import { InteractionRequiredAuthError } from "@azure/msal-browser"
import { mdiAccessPointNetworkOff, mdiAlert } from "@mdi/js"
import { useRouter } from "vue-router"
import { useAppStore, useLanguageStore } from "../stores"
import { ApplicationMessage } from "../types"
import { IHttpSettings, IProblemDetails } from "../types/http"
import { useMsal } from "./msal"
import { useCoreOptions } from "./options"

export function useApi(relativeBaseUri: string) {

  const appStore = useAppStore()
  const languageStore = useLanguageStore()
  const msal = useMsal()
  const router = useRouter();
  const coreOptions = useCoreOptions()
  const baseUri = `${coreOptions.api.gatewayUri}${relativeBaseUri}`
  
  const analyzeResponse = async (response: Response, settings: IHttpSettings) => {
    switch (response.status) {
      case 401:
        router.push({ name: 'Home' })
        return new ApplicationMessage('app.errors.notAuthorized', 'error', mdiAlert)
      case 403:
        router.push({ name: 'Forbidden' })
        return new ApplicationMessage('app.errors.notAuthorized', 'error', mdiAlert)
      case 404:
        if (settings.redirect404) {
          router.push({ name: 'NotFound' })
        }
        return new ApplicationMessage('app.errors.notFound', 'error', mdiAlert)
      case 400:
        const responseBody = await response.json() as IProblemDetails
        if (responseBody) {
          const errorMessage = new ApplicationMessage('', 'error', mdiAlert, undefined, undefined, true)
          if (responseBody.title) {
            errorMessage.title = responseBody.title
          }
          if (responseBody.errors) {
            errorMessage.details = ''
            for (const [key, values] of Object.entries(responseBody.errors)) {
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
      case 500:
        return new ApplicationMessage('app.errors.serverError', 'error', mdiAlert)
    }

    if (response.headers.has('Application-Error')) {
      const applicationError = response.headers.get('Application-Error')
      if (applicationError) {
        return new ApplicationMessage(applicationError, 'error', mdiAlert, undefined, undefined, true)
      }
    }
    
    return new ApplicationMessage('app.errors.serverError', 'error', mdiAlert)
  }

  const getAbsoluteUrl = (url: string) => {
    return `${baseUri}${url}`
  }

  const getRequestInit = (accessToken: string): RequestInit => {
    const headers: HeadersInit = {
      'Accept-Language': languageStore.language,
      'Content-Type': 'application/json;charset=utf-8'
    };

    if (accessToken) {
      headers.Authorization = `Bearer ${accessToken}`
    }

    return { headers }
  }

  const processRequest = async <TResponse>(url: string,
    settings: IHttpSettings,
    request: (absoluteUrl: string, requestInit: RequestInit) => Promise<Response>) => {

    var response: Response;

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

      const requestInit = getRequestInit(accessToken);
      const absoluteUrl = getAbsoluteUrl(url);
      response = await request(absoluteUrl, requestInit);
    } catch (error) {
      const errorMessage = new ApplicationMessage('app.errors.networkError', 'warning', mdiAccessPointNetworkOff)
      if (settings.errors) { appStore.displayMessage(errorMessage) }
      throw errorMessage;
    } finally {
      if (settings.load) { appStore.loading = false }
    }

    if (!response.ok) {
      const errorMessage = await analyzeResponse(response, settings)
      if (settings.errors) { appStore.displayMessage(errorMessage) }
      throw errorMessage; 
    }
    return response.json() as TResponse
  }

  const getHttp = async <TResponse>(url: string, settings: IHttpSettings) => {
    return processRequest<TResponse>(url, settings, (absoluteUrl, requestInit) => fetch(absoluteUrl, {
      ...requestInit
    }))
  }

  const postHttp = async <TRequest, TResponse>(url: string, data: TRequest, settings: IHttpSettings) => {
    return processRequest<TResponse>(url, settings, (absoluteUrl, requestInit) => fetch(absoluteUrl, {
      ...requestInit,
      method: 'post',
      body: JSON.stringify(data)
    }))
  }

  const patchHttp = async <TRequest, TResponse>(url: string, data: TRequest, settings: IHttpSettings) => {
    return processRequest<TResponse>(url, settings, (absoluteUrl, requestInit) => fetch(absoluteUrl, {
      ...requestInit,
      method: 'patch',
      body: JSON.stringify(data)
    }))
  }

  const deleteHttp = async <TResponse>(url: string, settings: IHttpSettings) => {
    return processRequest<TResponse>(url, settings, (absoluteUrl, requestInit) =>fetch(absoluteUrl, {
      ...requestInit,
      method: 'delete'
    }))
  }

  return {
    getHttp,
    postHttp,
    patchHttp,
    deleteHttp
  }
}
