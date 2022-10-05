import { AccountInfo, AuthenticationResult, AuthError, InteractionStatus, InteractionType, PopupRequest, PublicClientApplication, RedirectRequest, SilentRequest } from "@azure/msal-browser"
import { computed, ComputedRef, getCurrentInstance, ref, Ref, ToRefs, toRefs, watch } from "vue"
import { authorities, loginRequest } from "../data/config"
import { useAppStore } from "../stores"

export type MsalContext = {
  instance: PublicClientApplication,
  accounts: Ref<AccountInfo[]>,
  inProgress: Ref<InteractionStatus>,
  accountInfo: ComputedRef<{ id: string, name: string, email: string }>,
  editProfile: () => void,
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

  if (!instance.value || !accounts.value || !inProgress.value) {
    throw "Please install the msalPlugin";
  }

  const appStore = useAppStore();

  const accountInfo = computed(() => {
    if (accounts.value.length > 0) {
      const account = accounts.value[0]
      return {
        id: account.localAccountId,
        name: account.name ?? '',
        email: account.username
      }
    }
    return {
      id: '',
      name: '',
      email: ''
    };
  })

  const editProfile = () => {
    instance.value.loginRedirect({
      ...loginRequest,
      authority: authorities.profile_editing
    })
  }

  const login = () => {
    instance.value.loginRedirect({
      ...loginRequest
    })
  }

  const logout = () => {
    appStore.clean();
    instance.value.logoutRedirect()
  }

  return {
    instance: instance.value,
    accounts,
    inProgress,
    accountInfo,
    editProfile,
    login,
    logout
  }
}

export function useMsalAuthentication(request: RedirectRequest | SilentRequest): MsalAuthenticationResult {
  const { instance, inProgress } = useMsal();

  const localInProgress = ref<boolean>(false);
  const result = ref<AuthenticationResult | null>(null);
  const error = ref<AuthError | null>(null);

  const acquireToken = async (requestOverride?: PopupRequest | RedirectRequest | SilentRequest) => {
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

        await instance.loginRedirect(tokenRequest).catch((e) => {
          error.value = e;
          result.value = null;
        });
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

  acquireToken();

  return {
    acquireToken,
    result,
    error,
    inProgress: localInProgress
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
