<template>
  <v-container class="fill-height">
    <v-row>
      <v-col class="text-center">
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

        <v-select />
        <v-btn
          :disabled="loading || !online"
          color="primary"
          @click="openDialog">
          Open dialog
        </v-btn>

        <p>{{ formatContactStatus(ContactStatus.InProgress).title }}</p>
        <p>
          MSAL data (account info)
        </p>
        <p>
          {{ accountInfo }}
        </p>
        <p>
          MSAL data (accounts)
        </p>
        <p>
          {{ accounts }}
        </p>

        <dialog-test v-model="dialog" />
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
import HomeWelcome from '../components/home/HomeWelcome.vue'
import HomeLogin from '../components/home/HomeLogin.vue'
import HomeMessages from '../components/home/HomeMessages.vue'
import { useMapsStore } from '../stores';
import { useMapsApi } from '../composition/maps.api';
import { useAppStore, useIsAuthenticated, useMsal, usePage } from '@amilochau/core-vue3';
import DialogTest from '../components/dialogs/DialogTest.vue';
import { ref } from 'vue';
import { useOnline } from '@vueuse/core';
import { storeToRefs } from 'pinia';
import { useI18n } from 'vue-i18n';
import { useFormat } from '../composition/format';
import { ContactStatus } from '../types/contacts'

usePage()
const { d } = useI18n()
const mapsStore = useMapsStore()
const mapsApi = useMapsApi()
const isAuthenticated = useIsAuthenticated()
const { accountInfo, accounts } = useMsal()
const appStore = useAppStore()
const online = useOnline()
const { formatContactStatus } = useFormat()

const { loading } = storeToRefs(appStore)

const dialog = ref(false)

const stringDate = '2022-09-01'

const fetchMaps = () => {
  mapsApi.get()
}

const createMarker = () => {
  mapsApi.createMarker("8a3f6eabfcc3400aba1adeabe071b8e2")
}

const editMarker = () => {
  mapsApi.editMarker("8a3f6eabfcc3400aba1adeabe071b8e2", "f3b9c83d0bf94cc098bfe92007add022")
}

function openDialog() {
  dialog.value = true
}
</script>

<i18n lang="json">
  {
    "en": {
      "pageTitle": "Playground",
      "pageDescription": "Playground page"
    },
    "fr": {
      "pageTitle": "Test",
      "pageDescription": "Page de test"
    }
  }
</i18n>
