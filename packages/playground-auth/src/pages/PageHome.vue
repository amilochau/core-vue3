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
      <v-btn-action
        :disabled="loading || !online"
        color="primary"
        @click="openDialog">
        {{ t('openDialog') }}
      </v-btn-action>

      <p>
        {{ attributes }}
      </p>
    </div>

    <dialog-test v-model="dialog" />
  </app-responsive>
</template>

<script setup lang="ts">
import { AppResponsive } from '@amilochau/core-vue3/components'
import { mdiRefresh } from '@mdi/js'
import HomeLogin from '../components/home/HomeLogin.vue'
import HomeMessages from '../components/home/HomeMessages.vue'
import { useMapsStore } from '../stores';
import { useAppStore, useIdentityStore } from '@amilochau/core-vue3/stores';
import { usePage } from '@amilochau/core-vue3/composition';
import DialogTest from '../components/dialogs/DialogTest.vue';
import { computed, ref } from 'vue';
import { useOnline } from '@vueuse/core';
import { storeToRefs } from 'pinia';
import { useI18n } from 'vue-i18n';
import logoUrl from "@/assets/logo.png"

const { d, t } = useI18n()
usePage(computed(() => ({
  title: t('pageTitle'),
  description: t('pageDescription'),
  header: {},
  footer: {
    items: [
      {
        title: 'GitHub',
        link: 'https://github.com/amilochau/core-vue3'
      }
    ]
  },
})))
const mapsStore = useMapsStore()
const appStore = useAppStore()
const identityStore = useIdentityStore()
const online = useOnline()

const { loading } = storeToRefs(appStore)
const { attributes, isAuthenticated } = storeToRefs(identityStore)

const dialog = ref(false)

const openDialog = () => {
  dialog.value = true
}
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
  openDialog: Open dialog
fr:
  title: Bienvenue !
  openDialog: Ouvrir le dialog
</i18n>
