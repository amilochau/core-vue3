<template>
  <app-responsive>
    <div class="text-center">
      <home-welcome />
      <home-messages />

      <p>
        <v-btn-action
          :to="{ name: 'Components' }"
          color="primary"
          class="my-6">
          {{ t('seeComponents') }}
        </v-btn-action>
      </p>

      <v-btn-action
        :disabled="loading || !online"
        :prepend-icon="mdiGithub"
        color="secondary"
        @click="openDialog">
        {{ t('openDialog') }}
      </v-btn-action>

      <btn-card
        :icon="mdiGithub"
        tooltip-text="OK" />

      <suspense>
        <div>{{ true }}</div>
        <template #fallback>
          {{ false }}
        </template>
      </suspense>

      <dialog-test v-model="dialog" />
    </div>
  </app-responsive>
</template>

<script setup lang="ts">
import { AppResponsive } from '@amilochau/core-vue3/components';
import { mdiGithub } from '@mdi/js';
import HomeWelcome from '../components/home/HomeWelcome.vue';
import HomeMessages from '../components/home/HomeMessages.vue';
import BtnCard from '../components/buttons/BtnCard.vue';
import { useAppStore } from '@amilochau/core-vue3/stores';
import { usePage } from '@amilochau/core-vue3/composition';
import DialogTest from '../components/dialogs/DialogTest.vue';
import { computed, ref } from 'vue';
import { useOnline } from '@vueuse/core';
import { storeToRefs } from 'pinia';
import { useI18n } from 'vue-i18n';

const { t } = useI18n();
usePage(computed(() => ({
  title: t('pageTitle'),
  description: t('pageDescription'),
  header: {},
  footer: {
    items: [
      {
        title: 'GitHub',
        link: 'https://github.com/amilochau/core-vue3',
      },
    ],
  },
})));
const appStore = useAppStore();
const online = useOnline();

const { loading } = storeToRefs(appStore);

const dialog = ref(false);

const openDialog = () => {
  dialog.value = true;
};
</script>

<i18n lang="yaml">
en:
  pageTitle: Home
  pageDescription: Playground page
fr:
  pageTitle: Accueil
  pageDescription: Page de test
</i18n>

<i18n lang="yaml">
en:
  openDialog: Open dialog
  seeComponents: See components
fr:
  openDialog: Ouvrir le dialog
  seeComponents: Voir les composants
</i18n>
