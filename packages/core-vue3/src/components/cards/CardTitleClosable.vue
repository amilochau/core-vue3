<template>
  <v-card-item class="bg-primary py-1">
    <v-card-title class="multi-line">
      {{ title }}
    </v-card-title>
    <template #append>
      <v-btn
        :disabled="loading"
        :icon="mdiClose"
        variant="plain"
        size="small"
        @click="emits('close')" />
    </template>
  </v-card-item>
</template>

<script setup lang="ts">
import { useAppStore } from '../../stores'
import { mdiClose } from '@mdi/js'
import { storeToRefs } from 'pinia';

const appStore = useAppStore()
const { loading } = storeToRefs(appStore)

defineProps<{
  title: string
}>()

const emits = defineEmits<{
  (eventName: 'close'): void
}>()
</script>
