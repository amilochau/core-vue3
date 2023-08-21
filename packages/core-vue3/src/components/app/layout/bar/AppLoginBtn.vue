<template>
  <v-tooltip location="start">
    <template #activator="{ props: tooltip }">
      <v-btn
        v-bind="tooltip"
        :icon="mdiPower"
        :to="{ name: 'Login' }"
        :active="false" />
    </template>
    <span>{{ t('title') }}</span>
  </v-tooltip>
</template>

<script setup lang="ts">
import { mdiPower } from '@mdi/js'
import { useI18n } from 'vue-i18n';

const { t } = useI18n()
</script>

<i18n lang="yaml">
en:
  title: Login
fr:
  title: Connexion
</i18n>
