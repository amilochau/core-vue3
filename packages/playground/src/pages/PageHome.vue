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

      {{ formatTest1("test").title }}
      {{ formatTest2("test").title }}

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
import { useAppStore } from '@amilochau/core-vue3/stores';
import { usePage } from '@amilochau/core-vue3/composition';
import DialogTest from '../components/dialogs/DialogTest.vue';
import { computed, ref } from 'vue';
import { useOnline } from '@vueuse/core';
import { storeToRefs } from 'pinia';
import { useI18n } from 'vue-i18n';
import { useFormat } from '../composition/format';
import { ContactStatus } from '../types/contacts'
import { useFormat1 } from '@/composition/format/1'
import { useFormat2 } from '@/composition/format/2'

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
const online = useOnline()
const { formatContactStatus } = useFormat()
const { formatTest1 } = useFormat1()
const { formatTest2 } = useFormat2()

const { loading } = storeToRefs(appStore)

const dialog = ref(false)

const stringDate = '2022-09-01'

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
