<template>
  <dialog-form
    ref="dialogFormRef"
    :dialog-title="t('title')"
    :save-title="t('create')"
    :save-icon="mdiPlus"
    :save="save">
    <template #append:title>
      <v-tooltip
        location="start">
        <template #activator="{ props: tooltip }">
          <v-btn
            v-bind="tooltip"
            :disabled="loading"
            :icon="mdiUpload"
            variant="text"
            density="comfortable" />
        </template>
        <span>{{ t('upload') }}</span>
      </v-tooltip>
    </template>
    <template #default="{ model }">
      <v-text-field
        v-model="model.name"
        label="Required text"
        :rules="[ required(), minLength(2) ]"
        required
        clearable />
      <v-textarea
        v-model="model.desc"
        label="Non required text (set something to make save fail)"
        clearable />
    </template>
  </dialog-form>
</template>

<script setup lang="ts">
import { mdiAlert, mdiPlus, mdiUpload } from '@mdi/js';
import { ref } from 'vue';
import { DialogForm } from '@amilochau/core-vue3/components';
import { useValidationRules } from '@amilochau/core-vue3/composition';
import { useI18n } from 'vue-i18n';
import type { ApplicationMessage } from '@amilochau/core-vue3/types';
import { type ComponentExposed } from 'vue-component-type-helpers';
import { Item } from '@/types/test';
import { useAppStore } from '@amilochau/core-vue3/stores';
import { storeToRefs } from 'pinia';

const items = defineModel<Item[]>('items', { required: true });

const { t } = useI18n();
const { required, minLength } = useValidationRules();
const appStore = useAppStore();
const { loading } = storeToRefs(appStore);

const dialogFormRef = ref<ComponentExposed<typeof DialogForm<Item>>>();

const save = async (model: Item) => {
  await new Promise(resolve => setTimeout(resolve, 1000));
  if (model.desc?.length) {
    throw { title: t('errorMessage'), color: 'error', icon: mdiAlert, details: `Important details to display in the snackbar
New line here` } as ApplicationMessage;
  }

  items.value.push(model);
};

const open = () => {
  dialogFormRef.value?.open(new Item());
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
  upload: Upload
fr:
  title: Création d'item
  create: Créer
  errorMessage: Erreur de validation distante (simulée)
  upload: Upload
</i18n>
