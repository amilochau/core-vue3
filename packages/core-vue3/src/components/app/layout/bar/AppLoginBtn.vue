<template>
  <v-tooltip location="start">
    <template #activator="{ props: tooltip }">
      <v-scroll-y-reverse-transition mode="out-in">
        <v-btn
          v-if="coreOptions.authenticationEnabled && !isAuthenticated"
          v-bind="tooltip"
          :icon="mdiPower"
          :to="{ name: 'Login' }"
          :active="false" />
      </v-scroll-y-reverse-transition>
    </template>
    <span>{{ t('title') }}</span>
  </v-tooltip>
</template>

<script setup lang="ts">
import { mdiPower } from '@mdi/js'
import { storeToRefs } from 'pinia';
import { useCoreOptions } from '../../../../composition';
import { useIdentityStore } from '../../../../stores';
import { useI18n } from 'vue-i18n';

const { t } = useI18n()
const identityStore = useIdentityStore()
const coreOptions = useCoreOptions()
const { isAuthenticated } = storeToRefs(identityStore)
</script>

<i18n lang="yaml">
en:
  title: Login
fr:
  title: Connexion
</i18n>
