<template>
  <v-label
    :class="labelClass"
    color="error"
    class="multi-line">
    <v-icon
      v-if="icon"
      :icon="icon"
      start
      class="flex-shrink-0" />
    {{ title }}
  </v-label>
</template>

<script setup lang="ts">
import { computed } from 'vue';

const props = defineProps<{
  title: string,
  icon?: string,
  color?: 'primary' | 'warning' | 'error'
}>()

const labelClass = computed(() => [
  { 'text-subtitle-2': true },
  { 'mb-3': true },
  { 'w-100': true },
  { 'text-primary': !props.color || props.color === 'primary' },
  { 'text-warning': props.color === 'warning' },
  { 'text-error': props.color === 'error' },
])
</script>
