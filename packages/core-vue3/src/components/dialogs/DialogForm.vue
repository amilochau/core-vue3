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
        <v-card-text class="py-2">
          <slot :model="internalModel" />
          <v-scroll-y-transition>
            <div v-if="displayMasked">
              <slot
                name="masked"
                :model="internalModel" />
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
        <slot name="messages" />
        <card-messages v-if="!slots.messages" />
        <slot name="actions" />
        <card-actions
          v-if="!slots.actions && !hideActions"
          :cancel-icon="cancelIcon"
          :cancel-title="cancelTitle"
          :save-icon="saveIcon"
          :save-title="saveTitle"
          @cancel="cancel"
          @save="save" />
      </v-card>
    </v-form>
  </v-dialog>
</template>

<script setup lang="ts" generic="TModel extends object">
import { type Ref, ref } from 'vue';
import { useDisplay } from 'vuetify';
import CardActions from '../cards/CardActions.vue';
import CardMessages from '../cards/CardMessages.vue';
import CardTitleClosable from '../cards/CardTitleClosable.vue';
import { storeToRefs } from 'pinia';
import { useAppStore } from '../../stores';
import type { VForm } from 'vuetify/components';
import { useHandle } from '../../composition';
import { mdiChevronDown, mdiChevronUp } from '@mdi/js';
import { useI18n } from 'vue-i18n';
import { clone } from '../../utils/clone';

const props = defineProps<{
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
  /** Save function called before using the proxyModel as the model */
  save: (proxyModel: TModel) => Promise<any> | any
}>();

const emit = defineEmits<{
  close: [source: 'title' | 'actions' | 'out' | 'expose'],
  cancel: [],
  save: [],
}>();

const slots = defineSlots<{
  default(props: { model: TModel }): any,
  messages?(): any,
  actions?(): any,
  masked?(props: { model: TModel }): any,
}>();

const model = defineModel<TModel>({ default: {} });

const { t } = useI18n();
const { xs } = useDisplay();
const appStore = useAppStore();
const { loading } = storeToRefs(appStore);
const { handleFormValidation, handleLoadAndError } = useHandle();

const dialog = ref(false);
const form = ref<InstanceType<typeof VForm>>();
const displayMasked = ref(false);

// eslint-disable-next-line vue/no-ref-object-reactivity-loss
const internalModel: Ref<TModel> = ref(clone(model.value)) as Ref<TModel>;

const save = async () => {
  if (!await handleFormValidation(form)) {
    return;
  }
  await handleLoadAndError(async () => {
    await props.save(internalModel.value);
    model.value = clone(internalModel.value);
    close();
  }, 'internal');
  emit('save');
};

const open = () => {
  form.value?.reset();
  internalModel.value = clone(model.value);
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
  // @todo this should not close anymore - but revert changes back
  dialog.value = false;
  emit('close', 'actions');
  emit('cancel');
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

<i18n lang="yaml">
  en:
    seeMore: See more options
    hideMore: Hide options
  fr:
    seeMore: Voir plus d'options
    hideMore: Masquer les options
</i18n>
