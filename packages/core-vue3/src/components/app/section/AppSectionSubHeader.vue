<template>
  <h3 class="text-center mb-2">
    <slot />
  </h3>
</template>

<script setup lang="ts">
defineSlots<{
  default(): any,
}>();
</script>
