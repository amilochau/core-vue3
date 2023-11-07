import { computed } from "vue"
import { type RouteLocationRaw, useRouter } from "vue-router"

export const useNavigation = () => {
  const router = useRouter()

  const hasStateHistory = computed(() => !!router.options.history.state.back)

  const goBack = async (defaultRoute: RouteLocationRaw) => {
    if (hasStateHistory.value) {
      router.back()
    } else {
      await router.replace(defaultRoute)
    }
  }

  return {
    hasStateHistory,
    goBack,
  }
}
