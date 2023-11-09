<template>
  <app-responsive
    fill-height>
    <div class="text-center">
      <h1 class="text-h3 text-primary mb-4">
        {{ t('title') }}
      </h1>
      <p class="mb-4">
        {{ t('description') }}
      </p>
      <v-btn-action
        :disabled="loading"
        :to="{ name: 'Home' }"
        color="primary">
        {{ t('buttonText') }}
      </v-btn-action>
    </div>
  </app-responsive>
</template>

<script setup lang="ts">
import { AppResponsive } from '../components'
import { storeToRefs } from 'pinia';
import { useI18n } from 'vue-i18n';
import { usePage } from '../composition';
import { useAppStore } from '../stores';
import { computed } from 'vue';

const { t } = useI18n()
usePage(computed(() => ({
  title: t('pageTitle'),
  description: t('pageDescription'),
  header: {
    buttonMode: 'back',
    defaultBackTo: { name: 'Home' },
  }
})))
const appStore = useAppStore()
const { loading } = storeToRefs(appStore)
</script>

<i18n lang="yaml">
en:
  pageTitle: Forbidden
  pageDescription: Page for access to forbidden resources
fr:
  pageTitle: Accès non autorisé
  pageDescription: Page pour accès à des ressources interdites
</i18n>

<i18n lang="yaml">
en:
  title: Whoops, 403
  description: You don't have enough privileges to access this page.
  buttonText: Get me out of here!
fr:
  title: Oups, erreur 403
  description: Vous n'avez pas suffisamment de droits pour accéder à cette page.
  buttonText: Sortez-moi de là !
</i18n>
