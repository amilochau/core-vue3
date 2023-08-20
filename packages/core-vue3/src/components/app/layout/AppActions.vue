<template>
  <v-list
    :items="actions"
    item-props
    :lines="false" />
</template>

<script setup lang="ts">
defineProps<{
  actions: any[]
}>()
</script>
