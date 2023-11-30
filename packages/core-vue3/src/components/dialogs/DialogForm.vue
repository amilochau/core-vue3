<template>
  <v-dialog
    v-model="dialog"
    :fullscreen="xs"
    :persistent="!notPersistent"
    scrollable
    :max-width="maxWidth ?? '600px'">
    <v-form
      ref="form"
      :readonly="loading"
      @submit.prevent="save">
      <v-card>
        <card-title-closable
          :title="title"
          @close="close" />
        <slot />
        <card-messages />
        <card-actions
          v-if="!hideActions"
          :cancel-icon="cancelIcon"
          :cancel-title="cancelTitle"
          :save-icon="saveIcon"
          :save-title="saveTitle"
          @close="close"
          @save="save" />
      </v-card>
    </v-form>
  </v-dialog>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';
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
  title: string
  /** Whether the dialog is not persistent */
  notPersistent?: boolean
  /** Max width of the dialog */
  maxWidth?: string
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
}>();

const emit = defineEmits<{
  (eventName: 'close'): void
  (eventName: 'save'): void
}>();

const { xs } = useDisplay();
const appStore = useAppStore();
const { loading } = storeToRefs(appStore);
const { handleFormValidation } = useHandle();

const dialog = ref(false);
const form = ref<InstanceType<typeof VForm>>();

watch(dialog, (newValue) => {
  if (newValue) {
    form.value?.reset();
  } else {
    emit('close');
  }
});

const save = async () => {
  if (!await handleFormValidation(form)) {
    return;
  }

  emit('save');
};

const open = () => {
  dialog.value = true;
};
const close = () => {
  dialog.value = false;
};

defineExpose({
  open,
  close,
  form,
});
</script>

