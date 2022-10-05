import { msalInstance } from "@amilochau/core-vue3";
import { InteractionType, PopupRequest, PublicClientApplication, RedirectRequest } from "@azure/msal-browser";
import { NavigationGuardNext, RouteLocationNormalized, Router } from "vue-router";
import { loginRequest } from "../../data/config";

export function registerGuards(router: Router) {
  router.beforeEach(async (to: RouteLocationNormalized, from: RouteLocationNormalized, next: NavigationGuardNext) => {
    if (to.meta.requiresAuth) {
      const request: RedirectRequest = {
        ...loginRequest,
        redirectStartPage: to.fullPath
      }

      console.log('playground - registerguard - before isAuthenticated (using msalInstance')

      const authenticated = await isAuthenticated(msalInstance, InteractionType.Redirect, request);
      
      console.log('playground - registerguard - after isAuthenticated (using msalInstance')
      
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
  try {
    await instance.handleRedirectPromise()
    const accounts = instance.getAllAccounts();
    return accounts.length > 0;
  } catch (error) {
    return false;
  }
}
