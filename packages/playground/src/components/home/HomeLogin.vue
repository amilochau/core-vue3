<template>
  <h2 class="mb-2 text-h6">
    {{ t("title") }}
  </h2>
  <v-btn
    :disabled="loading"
    class="mt-12"
    color="primary"
    large
    @click="login">
    {{ t("button") }}
  </v-btn>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { useI18n } from 'vue-i18n';
import { useAppStore, useMsal } from '@amilochau/core-vue3';

const { t } = useI18n()
const { login } = useMsal()
const appStore = useAppStore()
const { loading } = storeToRefs(appStore)
</script>

<i18n lang="json">
  {
    "en": {
      "title": "Login in to use services.",
      "button": "Login"
    },
    "fr": {
      "title": "Connectez-vous pour utiliser les services.",
      "button": "Se connecter"
    }
  }
</i18n>
