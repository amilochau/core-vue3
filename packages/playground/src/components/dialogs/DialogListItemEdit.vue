<template>
  <dialog-form
    ref="dialogFormRef"
    :dialog-title="t('title')"
    :save-title="t('edit')"
    :save-icon="mdiPencil"
    :save="save">
    <template #default="{ model }">
      <v-text-field
        v-model="model.item.name"
        label="Required text"
        :rules="[ required(), minLength(2) ]"
        required
        clearable />
      <v-textarea
        v-model="model.item.desc"
        label="Non required text (set something to make save fail)"
        clearable />
    </template>
  </dialog-form>
</template>

<script setup lang="ts">
import { mdiAlert, mdiPencil } from '@mdi/js';
import { ref } from 'vue';
import { DialogForm } from '@amilochau/core-vue3/components';
import { useValidationRules } from '@amilochau/core-vue3/composition';
import { useI18n } from 'vue-i18n';
import type { ApplicationMessage } from '@amilochau/core-vue3/types';
import { type ComponentExposed } from 'vue-component-type-helpers';
import { Item } from '@/types/test';

const items = defineModel<Item[]>('items', { required: true });

const { t } = useI18n();
const { required, minLength } = useValidationRules();

const dialogFormRef = ref<ComponentExposed<typeof DialogForm<{ name: string, item: Item }>>>();

const save = async (model: { name: string, item: Item }) => {
  await new Promise(resolve => setTimeout(resolve, 1000));
  if (model.item.desc?.length) {
    throw { title: t('errorMessage'), color: 'error', icon: mdiAlert, details: `Important details to display in the snackbar
New line here` } as ApplicationMessage;
  }
  const item = items.value.find((x) => x.name === model.name);
  if (item) {
    item.name = model.item.name;
    item.desc = model.item.desc;
  }
};

const open = (name: string) => {
  dialogFormRef.value?.open({ name, item: items.value.find((x) => x.name === name)! });
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
