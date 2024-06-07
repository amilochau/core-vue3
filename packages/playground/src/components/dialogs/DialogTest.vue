<template>
  <dialog-form
    ref="dialogFormRef"
    v-model="item"
    :dialog-title="t('title')"
    :save-icon="mdiPlus"
    save-title="Validate & display snackbar"
    :save="save"
    @close="onClose">
    <template #default="{ proxyModel }">
      <v-text-field
        v-model="proxyModel.name"
        label="Required text"
        :rules="[ required(), minLength(2) ]"
        required
        clearable />
      <v-textarea
        v-model="proxyModel.desc"
        label="Non required text (set something to make save fail)"
        clearable />
    </template>
    <template #masked="{ proxyModel }">
      <field-numeric
        v-model="proxyModel.num"
        label="Numeric value"
        color="error" />
      <field-color-bullets
        v-model="proxyModel.color"
        label="Color"
        :colors="colors"
        hint="This is a hint" />
    </template>
  </dialog-form>
</template>

<script setup lang="ts">
import { mdiAlert, mdiPlus } from '@mdi/js';
import { ref } from 'vue';
import { DialogForm, FieldColorBullets, FieldNumeric } from '@amilochau/core-vue3/components';
import { useValidationRules } from '@amilochau/core-vue3/composition';
import { useI18n } from 'vue-i18n';
import type { ApplicationMessage } from '@amilochau/core-vue3/types';

type ItemType = {
  name: string,
  desc: string,
  num?: number,
  color?: string,
  desc2?: string,
};

const item = defineModel<ItemType>('item', { required: true });

const { t } = useI18n();
const { required, minLength } = useValidationRules();

type DialogFormItemType = typeof DialogForm<ItemType> & { new (...args: any): any };
const dialogFormRef = ref<InstanceType<DialogFormItemType>>();
const colors = ref(['#000', '#111', '#222', '#333', '#444', '#555', '#666', '#777', '#888', '#999', '#AAA', '#BBB', '#CCC', '#DDD', '#EEE', '#FFF']);

const save = (proxyModel: ItemType) => {
  if (proxyModel.desc.length) {
    throw { title: t('testMessage'), color: 'error', icon: mdiAlert, details: `Important details to display in the snackbar
New line here` } as ApplicationMessage;
  }
};

const onClose = () => {
  // We can have specific logics in the 'close'
};

const open = () => {
  dialogFormRef.value?.open();
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
