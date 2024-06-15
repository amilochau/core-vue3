<template>
  <dialog-form
    ref="dialogFormRef"
    :dialog-title="t('title')"
    :save-title="t('create')"
    :save-icon="mdiPlus"
    :save="save">
    <template #default="{ model }">
      <v-text-field
        v-model="model.record.name"
        label="Required text"
        :rules="[ required(), minLength(2) ]"
        required
        clearable />
      <v-textarea
        v-model="model.record.desc"
        label="Non required text (set something to make save fail)"
        clearable />
    </template>
    <template #masked="{ model }">
      <field-numeric
        v-model="model.record.num"
        label="Numeric value"
        color="error" />
      <field-color-bullets
        v-model="model.record.color"
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
import { type ComponentExposed } from 'vue-component-type-helpers';
import { ItemRecord, type Item } from '@/types/test';
import { getNewKey } from '@amilochau/core-vue3/utils';

const item = defineModel<Item>('item', { required: true });

const { t } = useI18n();
const { required, minLength } = useValidationRules();

const dialogFormRef = ref<ComponentExposed<typeof DialogForm<{ key: string, record: ItemRecord }>>>();
const colors = ref(['#000', '#111', '#222', '#333', '#444', '#555', '#666', '#777', '#888', '#999', '#AAA', '#BBB', '#CCC', '#DDD', '#EEE', '#FFF']);

const save = async (model: { key: string, record: ItemRecord }) => {
  await new Promise(resolve => setTimeout(resolve, 1000));
  if (model.record.desc?.length) {
    throw { title: t('errorMessage'), color: 'error', icon: mdiAlert, details: `Important details to display in the snackbar
New line here` } as ApplicationMessage;
  }

  item.value.records[model.key] = model.record;
};

const open = () => {
  dialogFormRef.value?.open({ key: getNewKey(item.value.records), record: new ItemRecord() });
};

defineExpose({
  open,
});
</script>

<i18n lang="yaml">
en:
  title: Item creation
  create: Create
  errorMessage: Remote validation error (simulated)
fr:
  title: Création d'item
  create: Créer
  errorMessage: Erreur de validation distante (simulée)
</i18n>
