<template>
  <app-responsive>
    <div class="text-center">
      <home-welcome />
      <home-messages />
      <p>
        {{ buildData.buildDate }}
      </p>
      <p class="my-3">
        <v-btn-action
          :to="{ name: 'Components' }"
          color="primary">
          {{ t('seeComponents') }}
        </v-btn-action>
      </p>
      <p class="my-3">
        <v-btn-action
          :to="{ name: 'Dialogs' }"
          color="primary">
          {{ t('seeDialogs') }}
        </v-btn-action>
      </p>
      <p class="my-3">
        <v-btn-action
          :to="{ name: 'Validations' }"
          color="primary">
          {{ t('seeValidations') }}
        </v-btn-action>
      </p>
      <p class="my-3">
        <v-btn-action
          :to="{ name: 'Loading' }"
          color="primary">
          {{ t('seeLoading') }}
        </v-btn-action>
      </p>

      <suspense>
        <div>{{ true }}</div>
        <template #fallback>
          {{ false }}
        </template>
      </suspense>
    </div>
  </app-responsive>
</template>

<script setup lang="ts">
import { AppResponsive } from '@amilochau/core-vue3/components';
import HomeWelcome from '../components/home/HomeWelcome.vue';
import HomeMessages from '../components/home/HomeMessages.vue';
import { usePage } from '@amilochau/core-vue3/composition';
import { computed } from 'vue';
import { useI18n } from 'vue-i18n';

type BuildData = {
  buildDate: string,
  commitDate: string,
  commitSha: string,
};

declare global {
  interface Window {
    buildData: BuildData;
  }
}

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

const buildData = window.buildData as BuildData;
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
  seeDialogs: See dialogs
  seeValidations: See validations
  seeLoading: See loading page
fr:
  openDialog: Ouvrir le dialog
  seeComponents: Voir les composants
  seeDialogs: Voir les dialogs
  seeValidations: Voir les validations
  seeLoading: Voir une page de chargement
</i18n>
