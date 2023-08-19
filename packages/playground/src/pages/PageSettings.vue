<template>
  <v-row
    class="h-100"
    no-gutters>
    <v-col class="text-center">
      Settings page content here...
    </v-col>
  </v-row>
</template>

<script setup lang="ts">
import { usePage } from '@amilochau/core-vue3';
import { useI18n } from 'vue-i18n';

usePage()
const { t } = useI18n()
</script>

<i18n lang="json">
  {
    "en": {
      "pageTitle": "Settings",
      "pageDescription": "Playground page"
    },
    "fr": {
      "pageTitle": "Paramètres",
      "pageDescription": "Page de test"
    }
  }
</i18n>
