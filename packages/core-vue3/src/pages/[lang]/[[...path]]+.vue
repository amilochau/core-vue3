<route lang="yaml">
name: NotFound
meta:
  allowAnonymous: true
  generateSsg: false
  noindex: true
  metadata:
    en:
      title: Page Not Found
      description: Page Not Found
    fr:
      title: Page introuvable
      description: Page introuvable
</route>

<template>
  <app-responsive
    fill-height>
    <v-empty-state
      :headline="t('headline')"
      :title="t('title')"
      :icon="mdiAlertOctagonOutline"
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
import { mdiAlertOctagonOutline } from '@mdi/js';

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
  headline: Whoops, 404
  title: The page you were looking for does not exist.
  action: Get me out of here!
fr:
  headline: Oups, erreur 404
  title: La page que vous cherchez n'existe pas.
  action: Sortez-moi de là !
</i18n>
