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
    <v-form
      ref="form"
      :readonly="loading"
      @submit.prevent="save">
      <v-card>
        <card-title-closable
          :title="dialogTitle"
          :prepend-icon="dialogIcon"
          @close="closeFromTitle" />
        <v-card-text class="pt-2">
          <slot />
        </v-card-text>
        <slot name="messages" />
        <card-messages v-if="!slots.messages" />
        <slot name="actions" />
        <card-actions
          v-if="!slots.actions && !hideActions"
          :cancel-icon="cancelIcon"
          :cancel-title="cancelTitle"
          :save-icon="saveIcon"
          :save-title="saveTitle"
          @cancel="closeFromActions"
          @save="save" />
      </v-card>
    </v-form>
  </v-dialog>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useDisplay } from 'vuetify';
import CardActions from '../cards/CardActions.vue';
import CardMessages from '../cards/CardMessages.vue';
import CardTitleClosable from '../cards/CardTitleClosable.vue';
import { storeToRefs } from 'pinia';
import { useAppStore } from '../../stores';
import type { VForm } from 'vuetify/components';
import { useHandle } from '../../composition';

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
  /** Title text for the cancel button */
  cancelTitle?: string,
  /** Icon for the cancel button */
  cancelIcon?: string,
  /** Title text for the save button */
  saveTitle?: string,
  /** Icon for the save button */
  saveIcon?: string
  /** Whether to attach the dialog, or the reference of the element to attach */
  attach?: string | boolean | Element
}>();

const emit = defineEmits<{
  close: [source: 'title' | 'actions' | 'out' | 'expose'],
  save: [],
}>();

const slots = defineSlots<{
  default(): any,
  messages?(): any,
  actions?(): any,
}>();

const { xs } = useDisplay();
const appStore = useAppStore();
const { loading } = storeToRefs(appStore);
const { handleFormValidation } = useHandle();

const dialog = ref(false);
const form = ref<InstanceType<typeof VForm>>();

const save = async () => {
  if (!await handleFormValidation(form)) {
    return;
  }
  emit('save');
};

const open = () => {
  form.value?.reset();
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
const closeFromActions = () => {
  dialog.value = false;
  emit('close', 'actions');
};
const close = () => {
  dialog.value = false;
  emit('close', 'expose');
};

defineExpose({
  open,
  close,
  save,
  form,
});
</script>
