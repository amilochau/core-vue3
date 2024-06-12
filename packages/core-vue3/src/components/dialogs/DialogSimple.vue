<template>
  <v-dialog
    v-model="dialog"
    :fullscreen="xs"
    :persistent="!notPersistent"
    :attach="attach"
    :max-width="dialogMaxWidth ?? '600px'"
    :class="dialogClass"
    scrollable
    @update:model-value="updateDialog">
    <v-card>
      <card-title-closable
        :title="dialogTitle"
        :prepend-icon="dialogIcon"
        @close="closeFromTitle" />
      <v-card-text
        v-if="slots.default"
        class="py-2">
        <slot />
      </v-card-text>
      <card-messages ref="cardMessagesRef" />
      <v-card-actions
        v-if="slots.actions && !hideActions"
        class="bg-primary py-1">
        <slot name="actions" />
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useDisplay } from 'vuetify';
import CardMessages from '../cards/CardMessages.vue';
import CardTitleClosable from '../cards/CardTitleClosable.vue';
import type { ApplicationMessage } from '../../types';

defineProps<{
  /** Dialog title */
  dialogTitle: string
  /** Dialog icon */
  dialogIcon?: string
  /** Dialog extra class */
  dialogClass?: string
  /** Dialog max width */
  dialogMaxWidth?: string | number
  /** Whether the dialog is not persistent */
  notPersistent?: boolean
  /** Whether to hide actions */
  hideActions?: boolean
  /** Whether to attach the dialog, or the reference of the element to attach */
  attach?: string | boolean | Element
}>();

const emit = defineEmits<{
  close: [source: 'title' | 'out' | 'expose'],
}>();

const slots = defineSlots<{
  default?(): any,
  actions?(): any,
}>();

const { xs } = useDisplay();

const dialog = ref(false);
const cardMessagesRef = ref<InstanceType<typeof CardMessages>>();

const open = () => {
  dialog.value = true;
};

const updateDialog = (value: boolean) => {
  if (!value) {
    emit('close', 'out');
  }
};
const closeFromTitle = () => {
  dialog.value = false;
  emit('close', 'title');
};
const close = () => {
  dialog.value = false;
  emit('close', 'expose');
};
const displayMessage = (message: ApplicationMessage) => cardMessagesRef.value?.displayMessage(message);

defineExpose({
  open,
  close,
  displayMessage,
});
</script>
