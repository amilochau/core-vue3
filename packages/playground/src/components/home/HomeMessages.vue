<template>
  <v-alert
    v-for="(item, i) in homeMessages"
    :key="i"
    :color="item.color"
    :icon="item.icon"
    :border="item.border"
    :prominent="item.prominent"
    :variant="item.variant">
    <div
      v-if="item.title"
      class="font-weight-bold mb-1">
      {{ item.title }}
    </div>
    <span v-if="item.message">
      {{ item.message }}
    </span>
  </v-alert>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { useAppStore } from '@amilochau/core-vue3';

const appStore = useAppStore()
const { homeMessages } = storeToRefs(appStore)
</script>
