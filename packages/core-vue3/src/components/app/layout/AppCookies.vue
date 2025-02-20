<template>
  <v-bottom-sheet
    v-model="displayed"
    inset>
    <v-card>
      <v-card-item :title="t('title')">
        <template #prepend>
          <v-icon
            :icon="mdiCookie"
            color="primary" />
        </template>
      </v-card-item>
      <v-card-actions class="flex-wrap justify-center">
        <v-btn-action
          color="info"
          class="mb-2 mx-2"
          variant="text"
          :href="privacyUrl"
          target="_blank"
          rel="noopener noreferrer">
          {{ t('seePolicy') }}
        </v-btn-action>
        <div>
          <v-btn-action
            color="success"
            class="mb-2"
            @click="accept">
            {{ t('accept') }}
          </v-btn-action>
          <v-btn-action
            color="error"
            class="mb-2"
            @click="refuse">
            {{ t('refuse') }}
          </v-btn-action>
        </div>
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
import type { CoreVue3ApplicationOptions } from 'src/types';

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
  seePolicy: Read
  accept: Accept
  refuse: Refuse
fr:
  title: Ce site utilise des cookies pour fonctionner.
  seePolicy: En savoir plus
  accept: Accepter
  refuse: Refuser
</i18n>

<i18n lang="yaml">
en:
  title: Privacy
fr:
  title: Confidentialité
</i18n>
