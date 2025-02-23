<template>
  <v-menu
    v-model="menuOpened"
    location="bottom end"
    persistent>
    <template #activator="{ props: menu }">
      <v-scroll-y-reverse-transition mode="out-in">
        <v-btn
          v-if="updateDisplay"
          v-bind="menu"
          :disabled="updateLoading || loading || !online"
          :icon="mdiUpdate"
          :loading="updateLoading"
          color="primary" />
      </v-scroll-y-reverse-transition>
    </template>
    <v-card>
      <v-alert
        :text="t('title')"
        density="compact"
        type="info"
        variant="tonal"
        class="text-body-2" />
      <v-list density="comfortable">
        <v-list-item
          :title="t('install')"
          :prepend-icon="mdiUpdate"
          @click="pwaStore.update" />
      </v-list>
    </v-card>
  </v-menu>
</template>

<script setup lang="ts">
import { mdiUpdate } from '@mdi/js';
import { useOnline } from '@vueuse/core';
import { useI18n } from 'vue-i18n';
import { useAppStore, usePwaStore } from '../../../../stores';
import { storeToRefs } from 'pinia';
import { ref, watch } from 'vue';

const { t } = useI18n();
const online = useOnline();
const appStore = useAppStore();
const { loading } = storeToRefs(appStore);
const pwaStore = usePwaStore();
const { updateDisplay, updateLoading } = storeToRefs(pwaStore);

const menuOpened = ref(false);
watch(updateDisplay, (newValue) => {
  if (newValue) {
    menuOpened.value = true;
  }
});
</script>

<i18n lang="yaml">
en:
  title: You can update this application!
  install: Update the application
fr:
  title: Vous pouvez mettre à jour cette application !
  install: Mettre à jour l'application
</i18n>
