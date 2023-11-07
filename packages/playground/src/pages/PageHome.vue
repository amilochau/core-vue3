<template>
  <app-responsive>
    <div class="text-center">
      <home-welcome />
      <home-messages />
      <p>{{ mapsStore.items }}</p>
      <p>{{ d(stringDate) }}</p>

      <v-select multiple />
      <v-btn
        :disabled="loading || !online"
        :prepend-icon="mdiGithub"
        color="primary"
        @click="openDialog">
        {{ t('openDialog') }}
      </v-btn>

      <btn-card
        :icon="mdiGithub"
        tooltip-text="OK" />

      <p>{{ formatContactStatus(ContactStatus.InProgress).title }}</p>

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
import { AppResponsive } from '@amilochau/core-vue3/components'
import { mdiGithub } from '@mdi/js'
import HomeWelcome from '../components/home/HomeWelcome.vue'
import HomeMessages from '../components/home/HomeMessages.vue'
import BtnCard from '../components/buttons/BtnCard.vue'
import { useMapsStore } from '../stores';
import { useMapsApi } from '../composition/maps.api';
import { useAppStore } from '@amilochau/core-vue3/stores';
import { useHandle, usePage } from '@amilochau/core-vue3/composition';
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
const online = useOnline()
const { formatContactStatus } = useFormat()

const { loading } = storeToRefs(appStore)

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
    openDialog: Open dialog
  fr:
    openDialog: Ouvrir le dialog
  </i18n>
  