import { type ComputedRef, watch } from 'vue';
import { useAppStore } from '../stores';
import type { PageData } from '../types';

/**
 * Use page.
 * @param pageData Page data.
 */
export const usePage = (pageData: ComputedRef<PageData>) => {
  const appStore = useAppStore();

  watch(pageData, () => {
    appStore.pageData = pageData.value;
  }, { immediate: true, deep: true });
};
