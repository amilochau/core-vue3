<template>
  <v-card-item
    :title="title"
    :prepend-icon="prependIcon"
    class="bg-primary py-1">
    <template
      v-if="prependIcon"
      #prepend>
      <v-icon
        :icon="prependIcon"
        start />
    </template>
    <template #append>
      <v-btn
        :disabled="loading"
        :icon="mdiClose"
        variant="plain"
        size="small"
        @click="emit('close')" />
    </template>
  </v-card-item>
</template>

<script setup lang="ts">
import { useAppStore } from '../../stores';
import { mdiClose } from '@mdi/js';
import { storeToRefs } from 'pinia';

defineProps<{
  /** Title */
  title: string
  /** Prepend icon */
  prependIcon?: string
}>();
const emit = defineEmits<{
  (eventName: 'close'): void
}>();
const appStore = useAppStore();
const { loading } = storeToRefs(appStore);
</script>
