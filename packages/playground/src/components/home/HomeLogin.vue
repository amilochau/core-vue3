<template>
  <h2 class="mb-2 text-h6">
    {{ t("pages.home.login.title") }}
  </h2>
  <v-btn
    :disabled="loading"
    class="mt-12"
    color="primary"
    large
    @click="login">
    {{ t("pages.home.login.button") }}
  </v-btn>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { useI18n } from 'vue-i18n';
import { useMsal } from '../../composition/msal';
import { useAppStore } from '@amilochau/core-vue3';

const { t } = useI18n()
const { login } = useMsal()
const appStore = useAppStore()
const { loading } = storeToRefs(appStore)
</script>
