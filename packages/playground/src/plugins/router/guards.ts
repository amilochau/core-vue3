import { InteractionType, PopupRequest, PublicClientApplication, RedirectRequest } from "@azure/msal-browser";
import { NavigationGuardNext, RouteLocationNormalized, Router } from "vue-router";
import { loginRequest, msalInstance } from "../msal/config";

export function registerGuards(router: Router) {
  router.beforeEach(async (to: RouteLocationNormalized, from: RouteLocationNormalized, next: NavigationGuardNext) => {
    if (to.meta.requiresAuth) {
      const request: RedirectRequest = {
        ...loginRequest,
        redirectStartPage: to.fullPath
      }
      const authenticated = await isAuthenticated(msalInstance, InteractionType.Redirect, request);
      if (!authenticated) {
        msalInstance.loginRedirect(request);
        next(false)
        return;
      }
    }

    next(); // make sure to always call next()!
  });
}

export async function isAuthenticated(instance: PublicClientApplication, interactionType: InteractionType, loginRequest: PopupRequest|RedirectRequest): Promise<boolean> {
  return instance.handleRedirectPromise().then(() => {
    const accounts = instance.getAllAccounts();
    if (accounts.length > 0) {
      return true;
    }

    if (interactionType === InteractionType.Popup) {
      return instance.loginPopup(loginRequest).then(() => {
        return true;
      }).catch(() => {
        return false;
      })
    }

    return false;
  }).catch(() => {
    return false;
  })
}
