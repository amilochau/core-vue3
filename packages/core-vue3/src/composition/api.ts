import { mdiAccessPointNetworkOff, mdiAlert } from "@mdi/js"
import { useRouter } from "vue-router"
import { useLanguageStore } from "../stores"
import { ApplicationMessage } from "../types"
import type { IHttpSettings, IProblemDetails } from "../types/http"
import { useCoreOptions } from "./options"
import { useI18n } from 'vue-i18n'

export const useApiAnonymous = (relativeBaseUri: string) => {

  const { t, mergeLocaleMessage } = useI18n()

  mergeLocaleMessage('en', {
    errors: {
      validation: "Validation error",
      notAuthorized: "Not authorized",
      notFound: "Not found",
      serverError: "Server error",
      networkError: "Network error: check your connection",
      sessionExpired: "Session expired: please login again",
    }
  })
  mergeLocaleMessage('fr', {
    errors: {
      validation: "Erreur de validation",
      notAuthorized: "Non autorisé",
      notFound: "Inconnu",
      serverError: "Erreur interne",
      networkError: "Erreur réseau : vérifiez votre connexion",
      sessionExpired: "Session expirée : veuillez vous reconnecter",
    }
  })

  const languageStore = useLanguageStore()
  const router = useRouter();
  const coreOptions = useCoreOptions()

  const baseUri = `${coreOptions.api?.gatewayUri}${relativeBaseUri}`

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
    if (!errorMessage.title.length) {
      errorMessage.title = t('errors.validation')
    }
    return errorMessage
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

  const getRequestInit = (): RequestInit => {
    const headers: HeadersInit = {
      'Accept-Language': languageStore.language,
      'Content-Type': 'application/json;charset=utf-8'
    };

    return { headers }
  }

  const processRequest = async (url: string,
    settings: IHttpSettings,
    request: (absoluteUrl: string, requestInit: RequestInit) => Promise<Response>) => {

    var response: Response;

    if (!coreOptions.apiEnabled) {
      throw 'API integration is not configured.'
    }

    try {
      const requestInit = getRequestInit();
      const absoluteUrl = getAbsoluteUrl(url);
      response = await request(absoluteUrl, requestInit);
    } catch (error) {
      throw new ApplicationMessage(t('errors.networkError'), 'warning', mdiAccessPointNetworkOff)
    }

    if (!response.ok) {
      throw await analyzeResponse(response, settings)
    }

    return response
  }

  return {
    getHttp: async (url: string, settings: IHttpSettings) => {
      return processRequest(url, settings, (absoluteUrl, requestInit) => fetch(absoluteUrl, {
        ...requestInit,
        method: 'GET'
      }))
    },
    postHttp: async <TRequest>(url: string, data: TRequest, settings: IHttpSettings) => {
      return processRequest(url, settings, (absoluteUrl, requestInit) => fetch(absoluteUrl, {
        ...requestInit,
        method: 'POST',
        body: JSON.stringify(data)
      }))
    },
    putHttp: async <TRequest>(url: string, data: TRequest, settings: IHttpSettings) => {
      return processRequest(url, settings, (absoluteUrl, requestInit) => fetch(absoluteUrl, {
        ...requestInit,
        method: 'PUT',
        body: JSON.stringify(data)
      }))
    },
    patchHttp: async <TRequest>(url: string, data: TRequest, settings: IHttpSettings) => {
      return processRequest(url, settings, (absoluteUrl, requestInit) => fetch(absoluteUrl, {
        ...requestInit,
        method: 'PATCH',
        body: JSON.stringify(data)
      }))
    },
    deleteHttp: async (url: string, settings: IHttpSettings) => {
      return processRequest(url, settings, (absoluteUrl, requestInit) => fetch(absoluteUrl, {
        ...requestInit,
        method: 'DELETE'
      }))
    },
  }
}
