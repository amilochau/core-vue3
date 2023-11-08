<template>
  <v-tooltip location="top">
    <template #activator="{ props: tooltip }">
      <v-btn
        v-bind="tooltip"
        :disabled="loading || !online"
        :icon="icon"
        :color="color"
        variant="text"
        @click="emit('click')" />
    </template>
    <span>{{ tooltipText }}</span>
  </v-tooltip>
</template>

<script setup lang="ts">
import { useOnline } from '@vueuse/core';
import { storeToRefs } from 'pinia';
import { useI18n } from 'vue-i18n';
import { useAppStore } from '@amilochau/core-vue3/stores';

defineProps<{
  /** Button icon */
  icon: string,
  /** Tooltip text */
  tooltipText: string,
  /** Button color */
  color?: string
}>()

const emit = defineEmits<{
  (eventName: 'click'): void
}>()

const { t } = useI18n()
const online = useOnline()
const appStore = useAppStore()
const { loading } = storeToRefs(appStore)
</script>
