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
import { useAppStore } from '../../../stores'

const { t } = useI18n()
const appStore = useAppStore()
const { loading } = storeToRefs(appStore)

let displayTimeout: any = 0

const props = defineProps<{
  lazyDelay?: number
}>()

const display = ref(false);

watch(loading, () => {
  if (loading.value) {
    displayTimeout = setTimeout(() => {
      display.value = true
    }, props.lazyDelay ?? 0)
  } else {
    clearTimeout(displayTimeout)
    display.value = false
  }
})
</script>

<style lang="sass" scoped>
.progress-bar
  position: absolute !important
  z-index: 9
</style>

<i18n lang="json">
  {
    "en": {
      "label": "Progress"
    },
    "fr": {
      "label": "Progression"
    }
  }
</i18n>
