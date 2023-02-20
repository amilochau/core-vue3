import { mdiAccessPointNetworkOff, mdiAlert } from "@mdi/js"
import { useRouter } from "vue-router"
import { useAppStore, useIdentityStore, useLanguageStore } from "../stores"
import { ApplicationMessage } from "../types"
import type { IHttpSettings, IProblemDetails } from "../types/http"
import { AuthPolicy } from "../types/http/IHttpSettings"
import { useCognito } from './cognito'
import { useCoreOptions } from "./options"
import { useI18n } from 'vue-i18n'
import { storeToRefs } from "pinia"

export function useApi(relativeBaseUri: string) {

  const { t, mergeLocaleMessage } = useI18n()

  mergeLocaleMessage('en', {
    errors: {
      notAuthorized: "Not authorized",
      notFound: "Not found",
      serverError: "Server error",
      networkError: "Network error: check your connection"
    }
  })
  mergeLocaleMessage('fr', {
    errors: {
      notAuthorized: "Non autorisé",
      notFound: "Inconnu",
      serverError: "Erreur interne",
      networkError: "Erreur réseau : vérifiez votre connexion"
    }
  })

  const appStore = useAppStore()
  const languageStore = useLanguageStore()
  const identityStore = useIdentityStore()
  const { getToken } = useCognito()
  const router = useRouter();
  const coreOptions = useCoreOptions()

  const { isAuthenticated } = storeToRefs(identityStore)
  const baseUri = `${coreOptions.api.gatewayUri}${relativeBaseUri}`

  const analyzeResponse = async (response: Response, settings: IHttpSettings) => {
    switch (response.status) {
      case 401:
        return buildApplicationMessage401()
      case 403:
        return buildApplicationMessage403()
      case 404:
        return buildApplicationMessage404(settings)
      case 400:
        const responseBody = await response.json() as IProblemDetails
        if (responseBody) {
          switch (responseBody.status) {
            case 401:
              return buildApplicationMessage401()
            case 403:
              return buildApplicationMessage403()
            case 404:
              return buildApplicationMessage404(settings)
          }

          return buildApplicationMessage400(responseBody)
        }
    }

    return buildApplicationMessage500()
  }

  const buildApplicationMessage400 = (problemDetails: IProblemDetails) => {
    const errorMessage = new ApplicationMessage('', 'error', mdiAlert)
    if (problemDetails.title) {
      errorMessage.title = problemDetails.title
    }
    if (problemDetails.errors) {
      errorMessage.details = ''
      for (const [key, values] of Object.entries(problemDetails.errors)) {
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
    return buildApplicationMessage500()
  }
  const buildApplicationMessage401 = () => {
    router.push({ name: 'Home' })
    return new ApplicationMessage(t('errors.notAuthorized'), 'error', mdiAlert)
  }
  const buildApplicationMessage403 = () => {
    router.push({ name: 'Forbidden' })
    return new ApplicationMessage(t('errors.notAuthorized'), 'error', mdiAlert)
  }
  const buildApplicationMessage404 = (settings: IHttpSettings) => {
    if (settings.redirect404) {
      router.push({ name: 'NotFound' })
    }
    return new ApplicationMessage(t('errors.notFound'), 'error', mdiAlert)
  }
  const buildApplicationMessage500 = () => {
    return new ApplicationMessage(t('errors.serverError'), 'error', mdiAlert)
  }

  const getAbsoluteUrl = (url: string) => {
    return `${baseUri}${url}`
  }

  const getRequestInit = (accessToken: string): RequestInit => {
    const headers: HeadersInit = {
      'Accept-Language': languageStore.language,
      'Content-Type': 'application/json;charset=utf-8' // @todo use "application/json-patch+json" for patch
    };

    if (accessToken) {
      headers.Authorization = `Bearer ${accessToken}`
    }

    return { headers }
  }

  const processRequest = async (url: string,
    settings: IHttpSettings,
    request: (absoluteUrl: string, requestInit: RequestInit) => Promise<Response>) => {

    var response: Response;

    try {
      // Start loading
      if (settings.load) { appStore.loading = true }

      // Get bearer token for API
      var accessToken = '';

      if (router.currentRoute.value.meta.anonymousRequests
        || settings.authPolicy === AuthPolicy.SendRequestsAsAnonymous
        || settings.authPolicy === AuthPolicy.SendRequestsAsAuthenticatedIfLoggedIn && !isAuthenticated.value) {
        // The user is not logged in but we don't mind
      } else {
        accessToken = await getToken()
      }

      const requestInit = getRequestInit(accessToken);
      const absoluteUrl = getAbsoluteUrl(url);
      response = await request(absoluteUrl, requestInit);
    } catch (error) {
      const errorMessage = new ApplicationMessage(t('errors.networkError'), 'warning', mdiAccessPointNetworkOff)
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

    return response
  }

  const getHttp = async (url: string, settings: IHttpSettings) => {
    return processRequest(url, settings, (absoluteUrl, requestInit) => fetch(absoluteUrl, {
      ...requestInit
    }))
  }

  const postHttp = async <TRequest>(url: string, data: TRequest, settings: IHttpSettings) => {
    return processRequest(url, settings, (absoluteUrl, requestInit) => fetch(absoluteUrl, {
      ...requestInit,
      method: 'post',
      body: JSON.stringify(data)
    }))
  }

  const putHttp = async <TRequest>(url: string, data: TRequest, settings: IHttpSettings) => {
    return processRequest(url, settings, (absoluteUrl, requestInit) => fetch(absoluteUrl, {
      ...requestInit,
      method: 'put',
      body: JSON.stringify(data)
    }))
  }

  const patchHttp = async <TRequest>(url: string, data: TRequest, settings: IHttpSettings) => {
    return processRequest(url, settings, (absoluteUrl, requestInit) => fetch(absoluteUrl, {
      ...requestInit,
      method: 'patch',
      body: JSON.stringify(data)
    }))
  }

  const deleteHttp = async (url: string, settings: IHttpSettings) => {
    return processRequest(url, settings, (absoluteUrl, requestInit) => fetch(absoluteUrl, {
      ...requestInit,
      method: 'delete'
    }))
  }

  return {
    getHttp,
    postHttp,
    putHttp,
    patchHttp,
    deleteHttp
  }
}
