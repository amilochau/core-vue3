<template>
  <v-expand-transition>
    <v-sheet
      v-if="display">
      <v-alert
        v-model="display"
        :color="message.color"
        :icon="message.icon"
        :title="message.title"
        :text="message.details"
        border="start"
        density="comfortable"
        variant="tonal"
        closable
        class="ma-2" />
    </v-sheet>
  </v-expand-transition>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { ref, watch } from 'vue';
import { useAppStore } from '../../stores'

const appStore = useAppStore()
const { message } = storeToRefs(appStore)

let displayTimeout: any = 0

const display = ref(false);

watch(message, () => {
  clearTimeout(displayTimeout)
  if (message.value) {
    display.value = true
    displayTimeout = setTimeout(() => {
      display.value = false
    }, message.value.timeout)
  } else {
    display.value = false
  }
}, { deep: true })
</script>
