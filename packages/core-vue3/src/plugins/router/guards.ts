import { coreOptions, msalInstance } from "../../index"; // @todo does it work? we may not want to import everything from the main package endpoint
import { PublicClientApplication, RedirectRequest } from "@azure/msal-browser";
import { NavigationGuardNext, RouteLocationNormalized, Router } from "vue-router";

export function registerGuards(router: Router) {
  router.beforeEach(async (to: RouteLocationNormalized, from: RouteLocationNormalized, next: NavigationGuardNext) => {

    if (to.meta.requiresAuth) {
      const request: RedirectRequest = {
        ...coreOptions.identity.loginRequest,
        redirectStartPage: to.fullPath,
      }

      const authenticated = await isAuthenticated(msalInstance);

      if (!authenticated) {
        await msalInstance.loginRedirect(request);
        next(false)
        return;
      }
    }

    next(); // make sure to always call next()!
  });
}

export async function isAuthenticated(msalInstance: PublicClientApplication): Promise<boolean> {
  try {
    await msalInstance.handleRedirectPromise()
    const accounts = msalInstance.getAllAccounts();
    return accounts.length > 0
  } catch (error) {
    return false;
  }
}
