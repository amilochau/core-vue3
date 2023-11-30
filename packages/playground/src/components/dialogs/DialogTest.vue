<template>
  <v-dialog
    v-model="dialog"
    :fullscreen="xs"
    persistent
    scrollable
    max-width="600px">
    <v-form
      ref="form"
      :readonly="loading"
      @submit.prevent="save">
      <v-card>
        <card-title-closable
          :title="t('title')"
          @close="close" />
        <v-card-text class="pt-2">
          <v-text-field
            v-model="item.name"
            label="Required text"
            :rules="[ required(), minLength(2) ]"
            required
            clearable />
          <v-textarea
            v-model="item.desc"
            label="Non required text"
            clearable />
        </v-card-text>
        <card-messages />
        <card-actions
          :save-icon="mdiPlus"
          save-title="Validate & display snackbar"
          @close="close"
          @save="save" />
      </v-card>
    </v-form>
  </v-dialog>
</template>

<script setup lang="ts">
import { mdiPlus } from '@mdi/js';
import { storeToRefs } from 'pinia';
import { type Ref, ref, watch } from 'vue';
import { CardActions, CardMessages, CardTitleClosable } from '@amilochau/core-vue3/components';
import { useAppStore } from '@amilochau/core-vue3/stores';
import { useHandle, useValidationRules } from '@amilochau/core-vue3/composition';
import { useDisplay } from 'vuetify';
import { useI18n } from 'vue-i18n';
import { VForm } from 'vuetify/components';
import { clone } from '@/utils/clone';

type ItemType = { name: string, desc: string };

const { t } = useI18n();
const appStore = useAppStore();
const { handleLoadAndError, handleFormValidation } = useHandle();
const { required, minLength } = useValidationRules();
const { xs } = useDisplay();

const { loading } = storeToRefs(appStore);

const dialog = ref(false);
const form = ref<InstanceType<typeof VForm>>();
const item: Ref<ItemType> = ref({ name: '', desc: '' });

const save = async () => {
  if (!await handleFormValidation(form)) {
    return;
  }

  await handleLoadAndError(() => {
    return new Promise<void>((resolve) => {
      close();
      resolve();
    });
  }, 'internal');
};
const initItem = (itemInfo: ItemType) => {
  item.value = clone(itemInfo);
};
const onClose = () => {
  // We can have specific logics in the 'close'
};

watch(dialog, (newValue) => { if (!newValue) { onClose(); } });
const open = (itemInfo: ItemType) => {
  initItem(itemInfo);
  form.value?.reset();
  dialog.value = true;
};
const close = () => {
  dialog.value = false;
};

defineExpose({
  open,
});
</script>

<i18n lang="yaml">
en:
  title: Test dialog
  close: Close
  testMessage: Test message
fr:
  title: Dialog de test
  close: Fermer
  testMessage: Test message
</i18n>
