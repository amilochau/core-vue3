<template>
  <v-scroll-y-reverse-transition mode="out-in">
    <v-btn
      v-if="!coreOptions.pwa?.hideInstallBtn && installDisplay && !isInstalled"
      v-tooltip:bottom="t('title')"
      :disabled="loading || !online"
      :icon="mdiDownload"
      color="primary"
      @click="pwaStore.install" />
  </v-scroll-y-reverse-transition>
</template>

<script setup lang="ts">
import { mdiDownload } from '@mdi/js';
import { useMediaQuery, useOnline } from '@vueuse/core';
import { useI18n } from 'vue-i18n';
import { useAppStore, usePwaStore } from '../../../../stores';
import { useAppOptions } from '../../../../composition';
import { storeToRefs } from 'pinia';

const { t } = useI18n();
const online = useOnline();
const appStore = useAppStore();
const { loading } = storeToRefs(appStore);
const pwaStore = usePwaStore();
const { installDisplay } = storeToRefs(pwaStore);
const { coreOptions } = useAppOptions();

const isInstalled = useMediaQuery('(display-mode: standalone)');
</script>

<i18n lang="yaml">
en:
  title: You can install this website as an application!
fr:
  title: Vous pouvez installer ce site comme une application !
</i18n>
