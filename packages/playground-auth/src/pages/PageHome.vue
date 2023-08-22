<template>
  <app-responsive class="text-center">
    <home-welcome />
    <home-messages />
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

    <dialog-test v-model="dialog" />
  </app-responsive>
</template>

<script setup lang="ts">
import { AppResponsive } from '@amilochau/core-vue3/src/components'
import HomeWelcome from '../components/home/HomeWelcome.vue'
import HomeLogin from '../components/home/HomeLogin.vue'
import HomeMessages from '../components/home/HomeMessages.vue'
import { useMapsStore } from '../stores';
import { useMapsApi } from '../composition/maps.api';
import { useAppStore, useHandle, useIdentityStore, usePage } from '@amilochau/core-vue3';
import DialogTest from '../components/dialogs/DialogTest.vue';
import { computed, ref } from 'vue';
import { useOnline } from '@vueuse/core';
import { storeToRefs } from 'pinia';
import { useI18n } from 'vue-i18n';
import { useFormat } from '../composition/format';
import { ContactStatus } from '../types/contacts'

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
