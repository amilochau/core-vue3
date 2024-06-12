<template>
  <dialog-form
    ref="dialogFormRef"
    v-model="item"
    :proxy-model-creation="proxyModelCreation"
    :dialog-title="t('title')"
    :save-title="t('edit')"
    :save="save">
    <template #default="{ model }">
      <v-text-field
        v-model="model.records[key].name"
        label="Required text"
        :rules="[ required(), minLength(2) ]"
        required
        clearable />
      <v-textarea
        v-model="model.records[key].desc"
        label="Non required text (set something to make save fail)"
        clearable />
    </template>
    <template #masked="{ model }">
      <field-numeric
        v-model="model.records[key].num"
        label="Numeric value"
        color="error" />
      <field-color-bullets
        v-model="model.records[key].color"
        label="Color"
        :colors="colors"
        hint="This is a hint" />
    </template>
  </dialog-form>
</template>

<script setup lang="ts">
import { mdiAlert } from '@mdi/js';
import { ref } from 'vue';
import { DialogForm, FieldColorBullets, FieldNumeric } from '@amilochau/core-vue3/components';
import { useValidationRules } from '@amilochau/core-vue3/composition';
import { useI18n } from 'vue-i18n';
import type { ApplicationMessage } from '@amilochau/core-vue3/types';
import { type ComponentExposed } from 'vue-component-type-helpers';
import { type Item } from '@/types/test';
import { clone } from '@amilochau/core-vue3/utils';

const item = defineModel<Item>('item', { required: true });

const { t } = useI18n();
const { required, minLength } = useValidationRules();

const dialogFormRef = ref<ComponentExposed<typeof DialogForm<Item>>>();
const colors = ref(['#000', '#111', '#222', '#333', '#444', '#555', '#666', '#777', '#888', '#999', '#AAA', '#BBB', '#CCC', '#DDD', '#EEE', '#FFF']);
const key = ref<string>('');
const proxyModelCreation = (model: Item) => {
  const proxyModel = clone(model);
  return proxyModel;
};

const save = async (model: Item) => {
  await new Promise(resolve => setTimeout(resolve, 1000));
  if (model.records[key.value].desc?.length) {
    throw { title: t('errorMessage'), color: 'error', icon: mdiAlert, details: `Important details to display in the snackbar
New line here` } as ApplicationMessage;
  }
};

const open = (itemRecordKey: string) => {
  key.value = itemRecordKey;
  dialogFormRef.value?.open();
};

defineExpose({
  open,
});
</script>

<i18n lang="yaml">
en:
  title: Item edition
  edit: Edit
  errorMessage: Remote validation error (simulated)
fr:
  title: Modification d'item
  edit: Modifier
  errorMessage: Erreur de validation distante (simulée)
</i18n>
