import { coreOptions, msalInstance } from "../../index"; // @todo does it work? we may not want to import everything from the main package endpoint
import { PublicClientApplication, RedirectRequest } from "@azure/msal-browser";
import { NavigationGuardNext, RouteLocationNormalized, Router } from "vue-router";

export function registerGuards(router: Router) {
  router.beforeEach(async (to: RouteLocationNormalized, from: RouteLocationNormalized, next: NavigationGuardNext) => {

    if (to.meta.requiresAuth) {
      const request: RedirectRequest = {
        ...coreOptions.identity.loginRequest,
        redirectStartPage: to.fullPath
      }

      const authenticated = await isAuthenticated(msalInstance, request);

      if (!authenticated) {
        msalInstance.loginRedirect(request);
        next(false)
        return;
      }
    }

    next(); // make sure to always call next()!
  });
}

export async function isAuthenticated(instance: PublicClientApplication, loginRequest: RedirectRequest): Promise<boolean> {
  try {
    await instance.handleRedirectPromise()
    const accounts = instance.getAllAccounts();
    if (accounts.length > 0) {
      return true;
    }

    await instance.loginRedirect(loginRequest)
    return true
  } catch (error) {
    return false;
  }
}
