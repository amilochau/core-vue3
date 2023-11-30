<template>
  <dialog-form
    ref="dialogFormRef"
    :title="t('title')"
    :save-icon="mdiPlus"
    save-title="Validate & display snackbar"
    @save="save"
    @close="onClose">
    <v-card-text class="pt-2">
      <v-text-field
        v-model="item.name"
        label="Required text"
        :rules="[ required(), minLength(2) ]"
        required
        clearable />
      <v-textarea
        v-model="item.desc"
        label="Non required text"
        clearable />
    </v-card-text>
  </dialog-form>
</template>

<script setup lang="ts">
import { mdiPlus } from '@mdi/js';
import { type Ref, ref } from 'vue';
import { DialogForm } from '@amilochau/core-vue3/components';
import { useHandle, useValidationRules } from '@amilochau/core-vue3/composition';
import { useI18n } from 'vue-i18n';
import { clone } from '@/utils/clone';

type ItemType = { name: string, desc: string };

const { t } = useI18n();
const { handleLoadAndError } = useHandle();
const { required, minLength } = useValidationRules();

const dialogFormRef = ref<InstanceType<typeof DialogForm>>();
const item: Ref<ItemType> = ref({ name: '', desc: '' });

const save = async () => {
  await handleLoadAndError(() => {
    return new Promise<void>((resolve) => {
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
