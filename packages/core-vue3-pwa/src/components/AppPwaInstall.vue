<template>
  <v-scroll-y-reverse-transition mode="out-in">
    <v-btn
      v-if="!pwaOptions.pwa?.hideInstallBtn && installDisplay && !isInstalled"
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
import { useAppStore } from '@amilochau/core-vue3/stores';
import { usePwaStore } from '../stores';
import { storeToRefs } from 'pinia';
import type { CorePwaOptions } from '../types/options';
import { inject } from 'vue';

const { t } = useI18n();
const online = useOnline();
const appStore = useAppStore();
const { loading } = storeToRefs(appStore);
const pwaStore = usePwaStore();
const { installDisplay } = storeToRefs(pwaStore);
// Use type assertion with the extended interface
const pwaOptions = inject('core-options-pwa') as CorePwaOptions;

const isInstalled = useMediaQuery('(display-mode: standalone)');
</script>

<i18n lang="yaml">
en:
  title: You can install this website as an application!
fr:
  title: Vous pouvez installer ce site comme une application !
</i18n>
