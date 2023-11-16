<template>
  <v-tooltip location="bottom">
    <template #activator="{ props: tooltip }">
      <v-scroll-y-reverse-transition mode="out-in">
        <v-btn
          v-if="updateDisplay"
          v-bind="tooltip"
          :disabled="updateLoading || loading || !online"
          :icon="mdiUpdate"
          :loading="updateLoading"
          color="primary"
          @click="pwaStore.update" />
      </v-scroll-y-reverse-transition>
    </template>
    <span>{{ t('title') }}</span>
  </v-tooltip>
</template>

<script setup lang="ts">
import { mdiUpdate } from '@mdi/js';
import { useOnline } from '@vueuse/core';
import { useI18n } from 'vue-i18n';
import { useAppStore, usePwaStore } from '../../../../stores';
import { storeToRefs } from 'pinia';

const { t } = useI18n();
const online = useOnline();
const appStore = useAppStore();
const { loading } = storeToRefs(appStore);
const pwaStore = usePwaStore();
const { updateDisplay, updateLoading } = storeToRefs(pwaStore);
</script>

<i18n lang="yaml">
en:
  title: You can update this application!
fr:
  title: Vous pouvez mettre à jour cette application !
</i18n>
