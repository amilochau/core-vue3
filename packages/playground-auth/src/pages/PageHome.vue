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
      <v-btn @click="fetchMaps">
        Fetch maps
      </v-btn>
      <v-btn @click="createMarker">
        Create marker
      </v-btn>
      <v-btn @click="editMarker">
        Edit marker
      </v-btn>
      <p>Date: {{ d(stringDate) }}</p>

      <v-btn @click="loading = !loading">
        Toggle loading
      </v-btn>

      <v-select multiple />
      <v-btn
        :disabled="loading || !online"
        color="primary"
        @click="openDialog">
        Open dialog
      </v-btn>

      <p>{{ formatContactStatus(ContactStatus.InProgress).title }}</p>
      <p>
        Cognito user attributes
      </p>
      <p>
        {{ attributes }}
      </p>

      <v-divider class="my-4" />
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
      </p>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
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
import { useMapsApi } from '../composition/maps.api';
import { useAppStore, useIdentityStore } from '@amilochau/core-vue3/stores';
import { useHandle, usePage } from '@amilochau/core-vue3/composition';
import DialogTest from '../components/dialogs/DialogTest.vue';
import { computed, ref } from 'vue';
import { useOnline } from '@vueuse/core';
import { storeToRefs } from 'pinia';
import { useI18n } from 'vue-i18n';
import { useFormat } from '../composition/format';
import { ContactStatus } from '../types/contacts'
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
const mapsApi = useMapsApi()
const appStore = useAppStore()
const { handleLoadAndError } = useHandle()
const identityStore = useIdentityStore()
const online = useOnline()
const { formatContactStatus } = useFormat()

const { loading } = storeToRefs(appStore)
const { attributes, isAuthenticated } = storeToRefs(identityStore)

const dialog = ref(false)

const stringDate = '2022-09-01'

const fetchMaps = () => {
  handleLoadAndError(() => {
    return mapsApi.get()
  }, 'snackbar')
}

const createMarker = () => {
  handleLoadAndError(() => {
    return mapsApi.createMarker("8a3f6eabfcc3400aba1adeabe071b8e2")
  }, 'snackbar')
}

const editMarker = () => {
  handleLoadAndError(() => {
    return mapsApi.editMarker("8a3f6eabfcc3400aba1adeabe071b8e2", "f3b9c83d0bf94cc098bfe92007add022")
  }, 'snackbar')
}

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
fr:
  title: Bienvenue !
</i18n>
