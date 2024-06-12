<template>
  <dialog-form
    ref="dialogFormRef"
    v-model="item"
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
import type { Item } from '@/types/test';

const item = defineModel<Item>('item', { required: true });

const { t } = useI18n();

const key = ref<string>('');

const dialogFormRef = ref<ComponentExposed<typeof DialogForm<Item>>>();

const save = async (model: Item) => {
  delete model.records[key.value];
  await new Promise(resolve => setTimeout(resolve, 1000));
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
  title: Item deletion
  delete: Delete
fr:
  title: Suppression d'item
  delete: Supprimer
</i18n>
