<route lang="yaml">
name: Loading
meta:
  generateSsg: true
  metadata:
    en:
      title: Loading
      description: Load.
    fr:
      title: Chargement
      description: Chargez.
</route>

<template>
  <div
    id="page-map"
    class="fill-height">
    <suspense>
      <page-layout />
      <template #fallback>
        <app-layout-loader
          :headline="t('loadingHeadline')"
          :title="t('loadingTitle')" />
      </template>
    </suspense>
  </div>
</template>

<script setup lang="ts">
import PageLayout from '@/components/PageLayout.vue';
import { AppLayoutLoader } from '@amilochau/core-vue3/components';
import { computed } from 'vue';
import { usePage } from '@amilochau/core-vue3/composition';
import { useI18n } from 'vue-i18n';

const { t } = useI18n();
usePage(computed(() => ({
  header: {},
})));
</script>

<i18n lang="yaml">
en:
  loadingHeadline: Loading...
  loadingTitle: Your page is almost ready!
fr:
  loadingHeadline: Chargement...
  loadingTitle: Votre page sera bientôt prête !
</i18n>
