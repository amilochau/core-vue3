<template>
  <v-tooltip location="start">
    <template #activator="{ props: tooltip }">
      <v-btn
        v-bind="tooltip"
        :icon="mdiPower"
        @click="login" />
    </template>
    <span>{{ t('title') }}</span>
  </v-tooltip>
</template>

<script setup lang="ts">
import { mdiPower } from '@mdi/js'
import { useI18n } from 'vue-i18n';
import { useCognito } from '../../../../composition';

const { t } = useI18n()
const { login } = useCognito()
</script>

<i18n lang="json">
  {
    "en": {
      "title": "Login"
    },
    "fr": {
      "title": "Connexion"
    }
  }
</i18n>
