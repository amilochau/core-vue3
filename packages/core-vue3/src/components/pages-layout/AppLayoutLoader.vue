<template>
  <v-empty-state
    :headline="headline"
    :title="title"
    :icon="mdiRunFast"
    color="primary">
    <v-progress-linear
      color="primary"
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
}>();
</script>

<style>
.loading-progress {
  min-width: 200px;
}
</style>
