<template>
  <v-bottom-sheet
    v-model="displayed"
    inset>
    <v-card>
      <v-card-item
        :title="t('title')"
        :subtitle="t('subtitle')">
        <template #prepend>
          <v-icon
            :icon="mdiCookie"
            color="primary" />
        </template>
      </v-card-item>
      <v-card-actions class="flex-wrap justify-center ga-2">
        <v-btn-action
          color="info"
          variant="text"
          :href="privacyUrl"
          target="_blank"
          rel="noopener noreferrer">
          {{ t('seePolicy') }}
        </v-btn-action>
        <v-btn-action
          color="success"
          @click="accept">
          {{ t('accept') }}
        </v-btn-action>
        <v-btn-action
          color="error"
          @click="refuse">
          {{ t('refuse') }}
        </v-btn-action>
      </v-card-actions>
    </v-card>
  </v-bottom-sheet>
</template>

<script setup lang="ts">
import { mdiCookie } from '@mdi/js';
import { useI18n } from 'vue-i18n';
import { useCookiesStore, useLanguageStore } from '../../../stores';
import { computed, inject, ref } from 'vue';
import { storeToRefs } from 'pinia';
import type { CoreVue3ApplicationOptions } from '../../../types';

const { t } = useI18n();
const cookiesStore = useCookiesStore();
const languageStore = useLanguageStore();
const { language } = storeToRefs(languageStore);
const appOptions = inject('app-options') as CoreVue3ApplicationOptions;

const displayed = ref(cookiesStore.showCookies);

const privacyUrl = computed(() => appOptions.privacyUrlBuilder(language));

const accept = () => {
  displayed.value = false;
  cookiesStore.acceptCookies();
};
const refuse = () => {
  displayed.value = false;
  cookiesStore.refuseCookies();
};
</script>

<i18n lang="yaml">
en:
  title: This website uses cookies to work.
  subtitle: Only technical cookies - no tracking, no marketing!
  seePolicy: Read
  accept: Accept
  refuse: Refuse
fr:
  title: Ce site utilise des cookies pour fonctionner.
  subtitle: Seulement des cookies techniques - pas de traçage, pas de marketing !
  seePolicy: En savoir plus
  accept: Accepter
  refuse: Refuser
</i18n>
