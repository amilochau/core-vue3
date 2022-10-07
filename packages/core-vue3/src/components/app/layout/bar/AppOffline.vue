<template>
  <v-tooltip location="bottom">
    <template #activator="{ props: tooltip }">
      <v-btn
        v-if="!online"
        v-bind="tooltip"
        :icon="mdiWifiStrengthAlertOutline"
        color="warning" />
    </template>
    <span>{{ t('app.header.offline.title') }}</span>
  </v-tooltip>
</template>

<script setup lang="ts">
import { mdiWifiStrengthAlertOutline } from '@mdi/js'
import { useOnline } from '@vueuse/core'
import { useI18n } from 'vue-i18n';

const { t } = useI18n()
const online = useOnline()
</script>
