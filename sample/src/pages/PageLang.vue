<template>
  <p>...</p>
</template>

<script setup lang="ts">
import { useRoute, useRouter } from 'vue-router';
import { useLanguageStore } from '../stores'

const router = useRouter()
const route = useRoute()
const languageStore = useLanguageStore()

if (route.path === '/') {
  router.replace(`/${languageStore.language}`)
} else {
  router.replace(`/${languageStore.language}${route.fullPath}`)
}
</script>
