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
      <slot
        v-if="slots.append"
        name="append" />
      <v-btn
        :disabled="loading"
        :icon="mdiClose"
        variant="text"
        density="comfortable"
        @click="emit('close')" />
    </template>
  </v-card-item>
</template>

<script setup lang="ts">
import { useAppStore } from '../../stores';
import { mdiClose } from '@mdi/js';
import { storeToRefs } from 'pinia';

defineProps<{
  /** Title. */
  title: string
  /** Prepend icon. */
  prependIcon?: string
}>();
const emit = defineEmits<{
  close: [],
}>();
const slots = defineSlots<{
  append?(): any,
}>();

const appStore = useAppStore();
const { loading } = storeToRefs(appStore);
</script>
