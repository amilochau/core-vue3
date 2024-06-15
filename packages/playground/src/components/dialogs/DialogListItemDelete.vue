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
import { Item } from '@/types/test';

const items = defineModel<Item[]>('items', { required: true });

const { t } = useI18n();

const dialogFormRef = ref<ComponentExposed<typeof DialogForm<{ name: string, item: Item }>>>();

const save = async (model: { name: string, item: Item }) => {
  await new Promise(resolve => setTimeout(resolve, 1000));

  items.value = items.value.filter((x) => x.name !== model.name);
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
  title: Item deletion
  delete: Delete
fr:
  title: Suppression d'item
  delete: Supprimer
</i18n>
