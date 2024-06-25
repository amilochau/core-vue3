<template>
  <v-empty-state
    :headline="headline"
    :title="title"
    :icon="icon ?? mdiRunFast"
    :color="color ?? 'primary'">
    <v-progress-linear
      :color="color ?? 'primary'"
      stream
      height="6"
      class="py-4 loading-progress" />
  </v-empty-state>
</template>

<script setup lang="ts">
import { mdiRunFast } from '@mdi/js';

defineProps<{
  /** Headline */
  headline: string,
  /** Title */
  title: string,
  /** Icon */
  icon?: string,
  /** Color */
  color?: string,
}>();
</script>

<style>
.loading-progress {
  min-width: 200px;
}
</style>
