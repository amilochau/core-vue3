<template>
  <div class="text-center mb-4">
    <slot />
  </div>
</template>

<script setup lang="ts">
defineSlots<{
  default(): any,
}>();
</script>
