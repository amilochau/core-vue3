<template>
  <v-label class="text-subtitle-2 mb-3 text-primary w-100">
    <v-icon
      v-if="icon"
      :icon="icon"
      start />
    {{ title }}
  </v-label>
</template>

<script setup lang="ts">
defineProps<{
  title: string,
  icon?: string
}>()
</script>
