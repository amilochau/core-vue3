import { AccountInfo, AuthenticationResult, AuthError, InteractionStatus, InteractionType, PublicClientApplication, RedirectRequest, SilentRequest } from "@azure/msal-browser";
import { computed, ComputedRef, getCurrentInstance, ref, Ref, ToRefs, toRefs, watch } from "vue";
import { useCoreOptions } from "./options";

export type MsalContext = {
  instance: PublicClientApplication,
  accounts: Ref<AccountInfo[]>,
  inProgress: Ref<InteractionStatus>,
  accountInfo: ComputedRef<{ id: string, name: string, email: string }>,
  editProfile: () => void,
  resetPassword: () => void,
  deleteAccount: () => void,
  login: () => void,
  logout: () => void
}

export type MsalAuthenticationResult = {
  acquireToken: Function;
  result: Ref<AuthenticationResult | null>;
  error: Ref<AuthError | null>;
  inProgress: Ref<boolean>;
}

export function useMsal(): MsalContext {
  const internalInstance = getCurrentInstance();
  if (!internalInstance) {
    throw "useMsal() cannot be called outside the setup() function of a component";
  }
  const { instance, accounts, inProgress }: ToRefs<{
    instance: PublicClientApplication,
    inProgress: InteractionStatus,
    accounts: AccountInfo[]
  }> = toRefs(internalInstance.appContext.config.globalProperties.$msal)

  const coreOptions = useCoreOptions()

  if (!instance.value || !accounts.value || !inProgress.value) {
    throw "Please install the msalPlugin";
  }

  if (inProgress.value === InteractionStatus.Startup) {
    instance.value.handleRedirectPromise().catch(() => {
      // Errors should be handled by listening to the LOGIN_FAILURE event
      return;
    });
  }

  const accountInfo = computed(() => {
    if (accounts.value.length > 0) {
      const account = accounts.value[0]
      return {
        id: account.localAccountId,
        name: account.name ?? '',
        email: (account.idTokenClaims?.email ?? '') as string
      }
    }
    return {
      id: '',
      name: '',
      email: ''
    };
  })

  const editProfile = () => {
    return instance.value.loginRedirect({
      ...coreOptions.identity.loginRequest,
      authority: coreOptions.identity.authorities.profile_editing
    })
  }

  const resetPassword = () => {
    return instance.value.loginRedirect({
      ...coreOptions.identity.loginRequest,
      authority: coreOptions.identity.authorities.password_reset
    })
  }

  const deleteAccount = () => {
    return instance.value.loginRedirect({
      ...coreOptions.identity.loginRequest,
      authority: coreOptions.identity.authorities.account_delete
    })
  }

  const login = () => {
    return instance.value.loginRedirect(coreOptions.identity.loginRequest)
  }

  const logout = () => {
    return instance.value.logoutRedirect()
  }

  return {
    instance: instance.value,
    accounts,
    inProgress,
    accountInfo,
    editProfile,
    resetPassword,
    deleteAccount,
    login,
    logout
  }
}

export function useIsAuthenticated(): Ref<boolean> {
  const { accounts } = useMsal();
  const isAuthenticated = ref(accounts.value.length > 0);

  watch(accounts, () => {
    isAuthenticated.value = accounts.value.length > 0;
  });

  return isAuthenticated;
}

export function useMsalAuthentication(interactionType: InteractionType, request: RedirectRequest | SilentRequest): MsalAuthenticationResult {
  const { instance, inProgress } = useMsal();

  const localInProgress = ref<boolean>(false);
  const result = ref<AuthenticationResult | null>(null);
  const error = ref<AuthError | null>(null);

  const acquireToken = async (requestOverride?: RedirectRequest | SilentRequest) => {
    if (!localInProgress.value) {
      localInProgress.value = true;
      const tokenRequest = requestOverride || request;

      if (inProgress.value === InteractionStatus.Startup || inProgress.value === InteractionStatus.HandleRedirect) {
        try {
          const response = await instance.handleRedirectPromise()
          if (response) {
            result.value = response;
            error.value = null;
            return;
          }
        } catch (e) {
          result.value = null;
          error.value = e as AuthError;
          return;
        };
      }

      try {
        const response = await instance.acquireTokenSilent(tokenRequest);
        result.value = response;
        error.value = null;
      } catch (e) {
        if (inProgress.value !== InteractionStatus.None) {
          return;
        }

        if (interactionType === InteractionType.Redirect) {
          await instance.loginRedirect(tokenRequest).catch((e) => {
            error.value = e;
            result.value = null;
          });
        }
      };
      localInProgress.value = false;
    }
  }

  const stopWatcher = watch(inProgress, () => {
    if (!result.value && !error.value) {
      acquireToken();
    } else {
      stopWatcher();
    }
  });

  return {
    acquireToken,
    result,
    error,
    inProgress: localInProgress
  }
}
