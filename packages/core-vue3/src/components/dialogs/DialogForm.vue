<template>
  <v-dialog
    v-model="dialog"
    :fullscreen="xs"
    :persistent="persistent"
    :attach="attach"
    :max-width="dialogMaxWidth ?? '600px'"
    :class="dialogClass"
    scrollable
    @update:model-value="updateDialog">
    <v-form
      ref="form"
      :readonly="loading || localLoading"
      @submit.prevent="save">
      <v-card :loading="localLoading">
        <template #loader="{ isActive }">
          <v-progress-linear
            :active="isActive"
            indeterminate
            color="info"
            height="4" />
        </template>
        <card-title-closable
          :title="dialogTitle"
          :prepend-icon="dialogIcon"
          @close="closeFromTitle">
          <template
            v-if="slots['append:title']"
            #append>
            <slot name="append:title" />
          </template>
        </card-title-closable>
        <v-card-text
          v-if="slots.default || slots.masked"
          class="py-2">
          <slot
            name="default"
            :model="internalModel!" />
          <v-scroll-y-transition>
            <div v-if="displayMasked">
              <slot
                name="masked"
                :model="internalModel!" />
            </div>
          </v-scroll-y-transition>
          <div
            v-if="slots.masked"
            class="text-center">
            <v-btn-action
              :prepend-icon="displayMasked ? mdiChevronUp : mdiChevronDown"
              density="comfortable"
              class="mt-2"
              color="primary"
              @click="displayMasked = !displayMasked">
              {{ displayMasked ? t('hideMore') : t('seeMore') }}
            </v-btn-action>
          </div>
        </v-card-text>
        <card-messages ref="cardMessagesRef" />
        <v-card-actions
          v-if="!hideActions"
          class="bg-primary py-1">
          <v-avatar
            v-if="!online"
            v-tooltip:start="t('offlineTitle')"
            density="comfortable">
            <v-icon
              :icon="mdiWifiStrengthAlertOutline"
              color="warning" />
          </v-avatar>
          <v-spacer />
          <v-btn
            v-if="!cancelHide"
            :disabled="loading || localLoading || !isModelChanged"
            :prepend-icon="cancelIconOrDefault"
            variant="text"
            color="grey-lighten-2"
            @click="cancel">
            {{ cancelTitleOrDefault }}
          </v-btn>
          <v-btn
            :disabled="loading || localLoading || !online"
            :loading="localLoading"
            :prepend-icon="saveIconOrDefault"
            variant="text"
            @click="save">
            {{ saveTitleOrDefault }}
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-form>
  </v-dialog>
</template>

<script setup lang="ts" generic="TModel extends object">
import { computed, ref } from 'vue';
import { useDisplay } from 'vuetify';
import CardMessages from '../cards/CardMessages.vue';
import CardTitleClosable from '../cards/CardTitleClosable.vue';
import { storeToRefs } from 'pinia';
import { useAppStore } from '../../stores';
import type { VForm } from 'vuetify/components';
import { useHandle } from '../../composition';
import { mdiChevronDown, mdiChevronUp, mdiPencil, mdiWifiStrengthAlertOutline } from '@mdi/js';
import { useI18n } from 'vue-i18n';
import { clone, deepEqual } from '../../utils';
import { useOnline } from '@vueuse/core';
import type { ApplicationMessage } from '../../types';

const props = defineProps<{
  /** Dialog title. */
  dialogTitle: string
  /** Dialog icon. */
  dialogIcon?: string
  /** Dialog extra class. */
  dialogClass?: string
  /** Dialog max width. */
  dialogMaxWidth?: string | number
  /** Whether the dialog is not persistent. */
  notPersistent?: boolean
  /** Whether to hide actions. */
  hideActions?: boolean
  /** Whether to attach the dialog, or the reference of the element to attach. */
  attach?: string | boolean | Element

  /** Title text for the cancel button. */
  cancelTitle?: string,
  /** Icon for the cancel button. */
  cancelIcon?: string,
  /** Whether to hide the cancel button. */
  cancelHide?: boolean,
  /** Title text for the save button. */
  saveTitle?: string,
  /** Icon for the save button. */
  saveIcon?: string
  /** Whether to remain the dialog open on save. */
  remainOpenOnSave?: boolean
  /** Function to modify model on save. */
  save: (proxyModel: TModel) => Promise<any> | any
}>();

const emit = defineEmits<{
  close: [source: 'title' | 'cancel' | 'out' | 'expose'],
  cancel: [],
  save: [],
}>();

const slots = defineSlots<{
  default?(props: { model: TModel }): any,
  masked?(props: { model: TModel }): any,
  'append:title'?(): any,
}>();

const { t } = useI18n();
const { xs } = useDisplay();
const appStore = useAppStore();
const { loading } = storeToRefs(appStore);
const online = useOnline();
const { handleFormValidation, handleLoadAndError } = useHandle();

const dialog = ref(false);
const localLoading = ref(false);
const form = ref<InstanceType<typeof VForm>>();
const cardMessagesRef = ref<InstanceType<typeof CardMessages>>();
const displayMasked = ref(false);
const persistent = computed(() => !props.notPersistent && isModelChanged.value);

const cancelTitleOrDefault = computed(() => props.cancelTitle ?? t('cancel'));
const cancelIconOrDefault = computed(() => props.cancelIcon ?? undefined);
const saveTitleOrDefault = computed(() => props.saveTitle ?? t('save'));
const saveIconOrDefault = computed(() => props.saveIcon ?? mdiPencil);

const originalModel = ref<TModel>();
const internalModel = ref<TModel>();
const isModelChanged = computed(() => !deepEqual(internalModel.value, originalModel.value));

const save = async () => {
  if (!await handleFormValidation(form)) {
    return;
  }
  await handleLoadAndError(async () => {
    await props.save(clone(internalModel.value!));
    if (!props.remainOpenOnSave) {
      close();
    }
  }, (m) => cardMessagesRef.value?.displayMessage(m), localLoading);
  emit('save');
};

const reset = () => {
  form.value?.reset();
  internalModel.value = clone(originalModel.value!);
};

const open = (model: TModel) => {
  originalModel.value = model;
  reset();
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
const cancel = () => {
  reset();
  emit('cancel');
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
  save,
  form,
  isModelChanged,
});
</script>

<i18n lang="yaml">
en:
  seeMore: See more options
  hideMore: Hide options
  offlineTitle: You lost your Internet connection...
  cancel: Cancel
  save: Save
fr:
  seeMore: Voir plus d'options
  hideMore: Masquer les options
  offlineTitle: Vous avez perdu votre connexion Internet...
  cancel: Annuler
  save: Sauvegarder
</i18n>
