<template>
  <v-progress-linear
    :active="display"
    indeterminate
    :aria-label="t('label')"
    class="progress-bar mt-0 mb-0 d-print-none" />
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { ref, watch } from 'vue';
import { useI18n } from 'vue-i18n';
import { useAppStore } from '../../../stores';

const props = defineProps<{
  /** Delay used before displaying the progress bar.  */
  lazyDelay?: number
}>();
const { t } = useI18n();
const appStore = useAppStore();
const { loading } = storeToRefs(appStore);

let displayTimeout: any = 0;

const display = ref(false);

watch(loading, () => {
  clearTimeout(displayTimeout);
  if (loading.value) {
    displayTimeout = setTimeout(() => {
      display.value = true;
    }, props.lazyDelay ?? 0);
  } else {
    display.value = false;
  }
});
</script>

<i18n lang="yaml">
en:
  label: Progress
fr:
  label: Progression
</i18n>

<style scoped>
.progress-bar {
  position: absolute !important;
  z-index: 1001;
}
</style>
