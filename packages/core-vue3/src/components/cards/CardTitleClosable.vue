<template>
  <v-card-item class="bg-primary py-1">
    <v-card-title>
      {{ title }}
    </v-card-title>
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
}>();
const emit = defineEmits<{
  (eventName: 'close'): void
}>();
const appStore = useAppStore();
const { loading } = storeToRefs(appStore);
</script>
