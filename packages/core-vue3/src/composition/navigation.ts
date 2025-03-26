import { computed } from 'vue';
import { type LocationQueryValue, type RouteLocationRaw, useRoute, useRouter } from 'vue-router';

/** Use navigation. */
export const useNavigation = () => {
  const route = useRoute();
  const router = useRouter();

  /**
   * Go back.
   * @param defaultRoute Default route to use as a fallback if no navigation history exists in state.
   */
  const goBack = async (defaultRoute: RouteLocationRaw) => {
    if (router.options.history.state.back) {
      router.back();
    } else {
      await router.replace(defaultRoute);
    }
  };

  const returnUrlQuery = computed<Record<string, LocationQueryValue | LocationQueryValue[]>>(() => ({ returnUrl: route.query.returnUrl }));

  return {
    goBack,
    returnUrlQuery,
  };
};
