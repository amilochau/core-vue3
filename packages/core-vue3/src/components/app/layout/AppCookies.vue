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
          @click="seePolicy">
          {{ t('seePolicy') }}
        </v-btn-action>
        <div>
          <v-btn-action
            color="success"
            class="mb-2"
            @click="cookiesStore.acceptCookies">
            {{ t('accept') }}
          </v-btn-action>
          <v-btn-action
            color="error"
            class="mb-2"
            @click="cookiesStore.refuseCookies">
            {{ t('refuse') }}
          </v-btn-action>
        </div>
      </v-card-actions>
    </v-card>
  </v-bottom-sheet>
  <v-dialog
    v-model="policyDisplayed"
    max-width="500px"
    scrollable>
    <v-card>
      <v-card-item
        :prepend-icon="mdiGavel"
        :title="t('title')"
        class="py-1">
        <template #append>
          <v-btn
            :disabled="loading"
            :icon="mdiClose"
            variant="plain"
            size="small"
            @click="policyDisplayed = false" />
        </template>
      </v-card-item>
      <privacy-card />
      <v-card-actions class="py-1 justify-center">
        <v-btn-action
          color="success"
          class="mb-2"
          @click="cookiesStore.acceptCookies">
          {{ t('accept') }}
        </v-btn-action>
        <v-btn-action
          color="error"
          class="mb-2"
          @click="cookiesStore.refuseCookies">
          {{ t('refuse') }}
        </v-btn-action>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script setup lang="ts">
import { mdiClose, mdiCookie, mdiGavel } from '@mdi/js'
import { useI18n } from 'vue-i18n';
import { useAppStore, useCookiesStore } from '../../../stores'
import { ref } from 'vue'
import PrivacyCard from '../content/PrivacyCard.vue'
import { storeToRefs } from 'pinia';

const { t } = useI18n()
const cookiesStore = useCookiesStore()
const appStore = useAppStore()
const { loading } = storeToRefs(appStore)

const displayed = ref(cookiesStore.showCookies)
const policyDisplayed = ref(false)

const seePolicy = () => {
  displayed.value = false
  policyDisplayed.value = true
}
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
