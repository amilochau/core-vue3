<template>
  <v-tooltip location="bottom">
    <template #activator="{ props: tooltip }">
      <v-btn
        v-if="!online"
        v-bind="tooltip"
        :icon="mdiWifiStrengthAlertOutline"
        color="warning" />
    </template>
    <span>{{ t('title') }}</span>
  </v-tooltip>
</template>

<script setup lang="ts">
import { mdiWifiStrengthAlertOutline } from '@mdi/js'
import { useOnline } from '@vueuse/core'
import { useI18n } from 'vue-i18n';

const { t } = useI18n()
const online = useOnline()
</script>

<i18n lang="json">
  {
    "en": {
      "title": "You lost your Internet connection..."
    },
    "fr": {
      "title": "Vous avez perdu votre connexion Internet..."
    }
  }
</i18n>
