<template>
  <dialog-form
    ref="dialogFormRef"
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
import type { Item, ItemRecord } from '@/types/test';

const item = defineModel<Item>('item', { required: true });

const { t } = useI18n();

const dialogFormRef = ref<ComponentExposed<typeof DialogForm<{ key: string, record: ItemRecord }>>>();

const save = async (model: { key: string, record: ItemRecord }) => {
  await new Promise(resolve => setTimeout(resolve, 1000));

  delete item.value.records[model.key];
};

const open = (key: string) => {
  dialogFormRef.value?.open({ key, record: item.value.records[key] });
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
