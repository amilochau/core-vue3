<template>
  <v-tooltip location="start">
    <template #activator="{ props: tooltip }">
      <v-btn
        v-bind="tooltip"
        :icon="mdiPower"
        @click="login" />
    </template>
    <span>{{ t('app.header.login.title') }}</span>
  </v-tooltip>
</template>

<script setup lang="ts">
import { mdiPower } from '@mdi/js'
import { useI18n } from 'vue-i18n';
import { useMsal } from '../../../../composition/msal';

const { t } = useI18n()
const { login } = useMsal()
</script>
