<route lang="yaml">
name: Forbidden
meta:
  allowAnonymous: true
  generateSsg: false
  noindex: true
  metadata:
    en:
      title: Forbidden
      description: Forbidden
    fr:
      title: Accès non autorisé
      description: Accès non autorisé
</route>

<template>
  <app-responsive
    fill-height>
    <v-empty-state
      :headline="t('headline')"
      :title="t('title')"
      :icon="mdiLockOutline"
      color="primary">
      <template #actions>
        <v-btn-action
          :disabled="loading"
          :to="{ name: 'Home' }"
          color="primary"
          class="mb-4">
          {{ t('action') }}
        </v-btn-action>
      </template>
    </v-empty-state>
  </app-responsive>
</template>

<script setup lang="ts">
import { AppResponsive } from '../../components';
import { storeToRefs } from 'pinia';
import { useI18n } from 'vue-i18n';
import { usePage } from '../../composition';
import { useAppStore } from '../../stores';
import { computed } from 'vue';
import { mdiLockOutline } from '@mdi/js';

const { t } = useI18n();
usePage(computed(() => ({
  header: {
    buttonMode: 'back',
    defaultBackTo: { name: 'Home' },
  },
})));
const appStore = useAppStore();
const { loading } = storeToRefs(appStore);
</script>

<i18n lang="yaml">
en:
  headline: Whoops, 403
  title: You don't have enough privileges to access this page.
  action: Get me out of here!
fr:
  headline: Oups, erreur 403
  title: Vous n'avez pas suffisamment de droits pour accéder à cette page.
  action: Sortez-moi de là !
</i18n>
