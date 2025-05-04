import { defineStore } from 'pinia';
import { Ref, ref, computed, unref } from 'vue';
import type { SettingsLink } from '../types/stores/settings';

export const useSettingsStore = defineStore('settings', () => {
  const linkedRefs = ref<Ref<SettingsLink[]>[]>([]);

  // Compute additional links by combining all registered ref values
  const additionalLinks = computed(() => {
    return linkedRefs.value.reduce((acc, ref) => {
      return acc.concat(unref(ref));
    }, [] as SettingsLink[]);
  });

  const registerLinks = (links: Ref<SettingsLink[]>) => {
    linkedRefs.value.push(links);
  };

  return {
    additionalLinks,
    registerLinks,
  };
});
