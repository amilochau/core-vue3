<template>
  <dialog-form
    ref="dialogFormRef"
    :proxy-model-creation="proxyModelCreation"
    :dialog-title="t('title')"
    cancel-hide
    :save-title="t('delete')"
    :save-icon="mdiDelete"
    :save="save" />
</template>

<script setup lang="ts">
import { mdiDelete } from '@mdi/js';
import { ref } from 'vue';
import { DialogForm } from '@amilochau/core-vue3/components';
import { useI18n } from 'vue-i18n';
import { type ComponentExposed } from 'vue-component-type-helpers';
import { Item } from '@/types/test';
import { clone } from '@amilochau/core-vue3/utils';

const items = defineModel<Item[]>('items', { required: true });

const { t } = useI18n();

const dialogFormRef = ref<ComponentExposed<typeof DialogForm<Item>>>();
const name = ref('');
const proxyModelCreation = (model: Item) => {
  return clone(items.value.find((x) => x.name === name.value)!);
};

const save = async (model: Item) => {
  await new Promise(resolve => setTimeout(resolve, 1000));

  items.value = items.value.filter((x) => x.name !== model.name);
};

const open = (itemName: string) => {
  name.value = itemName;
  dialogFormRef.value?.open();
};

defineExpose({
  open,
});
</script>

<i18n lang="yaml">
en:
  title: Item deletion
  delete: Delete
fr:
  title: Suppression d'item
  delete: Supprimer
</i18n>
