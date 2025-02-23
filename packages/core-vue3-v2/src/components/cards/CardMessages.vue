<template>
  <v-expand-transition>
    <v-sheet
      v-if="display && message">
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
        class="ma-2 multi-line" />
    </v-sheet>
  </v-expand-transition>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';
import type { ApplicationMessage } from '../../types';

const display = ref(false);
const message = ref<ApplicationMessage>();
let displayTimeout: any = 0;

watch(message, (m) => {
  clearTimeout(displayTimeout);
  if (m) {
    display.value = true;
    displayTimeout = setTimeout(() => {
      display.value = false;
    }, m.timeout_ms ?? 10000);
  } else {
    display.value = false;
  }
}, { deep: true });

const displayMessage = (applicationMessage: ApplicationMessage) => {
  message.value = applicationMessage;
};

defineExpose({
  displayMessage,
});
</script>
