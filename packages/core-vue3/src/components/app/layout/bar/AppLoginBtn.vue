<template>
  <v-scroll-y-reverse-transition mode="out-in">
    <v-btn
      v-if="authenticationEnabled && !isAuthenticated"
      v-tooltip:start="t('title')"
      :icon="mdiPower"
      :to="{ name: 'Login' }"
      :active="false" />
  </v-scroll-y-reverse-transition>
</template>

<script setup lang="ts">
import { mdiPower } from '@mdi/js';
import { storeToRefs } from 'pinia';
import { useAppOptions } from '../../../../composition';
import { useIdentityStore } from '../../../../stores';
import { useI18n } from 'vue-i18n';

const { t } = useI18n();
const identityStore = useIdentityStore();
const { authenticationEnabled } = useAppOptions();
const { isAuthenticated } = storeToRefs(identityStore);
</script>

<i18n lang="yaml">
en:
  title: Login
fr:
  title: Connexion
</i18n>
