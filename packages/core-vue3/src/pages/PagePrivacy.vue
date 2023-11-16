<template>
  <app-responsive
    :title="t('title')">
    <v-card
      :class="{ 'bg-transparent': xs }"
      flat>
      <privacy-card />
    </v-card>
  </app-responsive>
</template>

<script setup lang="ts">
import { AppResponsive } from '../components';
import PrivacyCard from '../components/app/content/PrivacyCard.vue';
import { useI18n } from 'vue-i18n';
import { useCoreOptions, usePage } from '../composition';
import { computed } from 'vue';
import { useDisplay } from 'vuetify';

const { t, mergeLocaleMessage } = useI18n();
usePage(computed(() => ({
  title: t('pageTitle'),
  description: t('pageDescription'),
  header: {
    buttonMode: 'back',
    defaultBackTo: { name: 'Home' },
  },
})));
const coreOptions = useCoreOptions();
const { xs } = useDisplay();

Object.entries(coreOptions.i18n.messages).map(([key, item]) => {
  mergeLocaleMessage(key, {
    appTitle: item.appTitle,
  });
});
</script>

<i18n lang="yaml">
en:
  pageTitle: Privacy
  pageDescription: Privacy page
fr:
  pageTitle: Confidentialité
  pageDescription: Page de confidentialité
</i18n>

<i18n lang="yaml">
en:
  title: Privacy
fr:
  title: Confidentialité
</i18n>
