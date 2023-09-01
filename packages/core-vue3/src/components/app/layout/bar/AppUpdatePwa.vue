<template>
  <v-tooltip location="bottom">
    <template #activator="{ props: tooltip }">
      <v-scroll-y-reverse-transition mode="out-in">
        <v-btn
          v-if="display"
          v-bind="tooltip"
          :disabled="loading || !online"
          :icon="mdiUpdate"
          :loading="loading"
          color="primary"
          @click="pwaStore.update" />
      </v-scroll-y-reverse-transition>
    </template>
    <span>{{ t('title') }}</span>
  </v-tooltip>
</template>

<script setup lang="ts">
import { mdiUpdate } from '@mdi/js'
import { useOnline } from '@vueuse/core'
import { useI18n } from 'vue-i18n';
import { usePwaStore } from '../../../../stores'
import { storeToRefs } from 'pinia'

const { t } = useI18n()
const online = useOnline()
const pwaStore = usePwaStore()
const { display, loading } = storeToRefs(pwaStore)
</script>

<i18n lang="yaml">
en:
  title: You can update this page to have the latests available content!
fr:
  title: Vous pouvez mettre à jour cette page pour avoir le dernier contenu disponible !
</i18n>
