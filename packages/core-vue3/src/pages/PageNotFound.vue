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
      <v-btn
        :disabled="loading"
        :to="{ name: 'Home' }"
        variant="outlined"
        color="primary"
        rounded>
        {{ t('buttonText') }}
      </v-btn>
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
  pageTitle: Not Found
  pageDescription: Page for access to not found resources
fr:
  pageTitle: Inconnu
  pageDescription: Page pour accès à des ressources non trouvées
</i18n>

<i18n lang="yaml">
en:
  title: Whoops, 404
  description: The page you were looking for does not exist.
  buttonText: Get me out of here!
fr:
  title: Oups, erreur 404
  description: La page que vous cherchez n'existe pas.
  buttonText: Sortez-moi de là !
</i18n>
