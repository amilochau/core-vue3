<template>
  <app-responsive
    :button="{
      title: 'Go back',
      color: 'warning',
      icon: mdiRefresh,
    }"
    :links="[
      { title: 'Privacy', to: { name: 'Privacy' } }
    ]">
    <template #prepend>
      <v-row
        justify="center">
        <v-col
          cols="12"
          sm="9"
          md="8"
          lg="6"
          class="text-center">
          <v-img
            :src="logoUrl"
            :height="72"
            class="mt-4" />
          <h1 class="mt-4 text-h4 text-primary">
            {{ t('title') }}
          </h1>
          <home-messages />
        </v-col>
      </v-row>
    </template>
    <div class="text-center">
      <home-login v-if="!isAuthenticated" />

      <p>{{ mapsStore.items }}</p>

      <p>
        {{ attributes }}
      </p>
    </div>
  </app-responsive>
</template>

<script setup lang="ts">
import { AppResponsive } from '@amilochau/core-vue3/components';
import { mdiRefresh } from '@mdi/js';
import HomeLogin from '../components/home/HomeLogin.vue';
import HomeMessages from '../components/home/HomeMessages.vue';
import { useMapsStore } from '../stores';
import { useIdentityStore } from '@amilochau/core-vue3/stores';
import { usePage } from '@amilochau/core-vue3/composition';
import { computed } from 'vue';
import { storeToRefs } from 'pinia';
import { useI18n } from 'vue-i18n';
import logoUrl from '@/assets/logo.png';

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
const mapsStore = useMapsStore();
const identityStore = useIdentityStore();
const { attributes, isAuthenticated } = storeToRefs(identityStore);
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
  title: Welcome!
fr:
  title: Bienvenue !
</i18n>
