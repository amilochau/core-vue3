<template>
  <v-container class="fill-height">
    <v-row
      align="center"
      class="h-100">
      <v-col class="text-center">
        <h1 class="text-h3 text-primary mb-4">
          {{ t('pages.notFound.title') }}
        </h1>
        <p class="mb-4">
          {{ t('pages.notFound.description') }}
        </p>
        <v-btn
          :disabled="loading"
          :to="{ name: 'Home' }"
          variant="outlined"
          color="primary">
          {{ t('pages.notFound.buttonText') }}
        </v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { useAppStore } from '@amilochau/core-vue3';
import { useI18n } from 'vue-i18n';

const { t } = useI18n()
const appStore = useAppStore()
const { loading } = storeToRefs(appStore)
</script>
