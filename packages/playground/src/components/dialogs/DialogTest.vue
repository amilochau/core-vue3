<template>
  <dialog-form
    ref="dialogFormRef"
    :dialog-title="t('title')"
    :save-icon="mdiPlus"
    save-title="Validate & display snackbar"
    @save="save"
    @close="onClose">
    <v-text-field
      v-model="item.name"
      label="Required text"
      :rules="[ required(), minLength(2) ]"
      required
      clearable />
    <v-textarea
      v-model="item.desc"
      label="Non required text (set something to make save fail)"
      clearable />
  </dialog-form>
</template>

<script setup lang="ts">
import { mdiAlert, mdiPlus } from '@mdi/js';
import { type Ref, ref } from 'vue';
import { DialogForm } from '@amilochau/core-vue3/components';
import { useHandle, useValidationRules } from '@amilochau/core-vue3/composition';
import { useI18n } from 'vue-i18n';
import { clone } from '@/utils/clone';
import type { ApplicationMessage } from '@amilochau/core-vue3/types';

type ItemType = { name: string, desc: string };

const { t } = useI18n();
const { handleLoadAndError } = useHandle();
const { required, minLength } = useValidationRules();

const dialogFormRef = ref<InstanceType<typeof DialogForm>>();
const item: Ref<ItemType> = ref({ name: '', desc: '' });

const save = async () => {
  await handleLoadAndError(() => {
    return new Promise<void>((resolve) => {
      if (item.value.desc.length) {
        throw { title: t('testMessage'), color: 'error', icon: mdiAlert, details: `Important details to display in the snackbar
    New line here` } as ApplicationMessage;
      }
      dialogFormRef.value?.close();
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

const open = (itemInfo: ItemType) => {
  initItem(itemInfo);
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
