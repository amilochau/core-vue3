<template>
  <v-divider class="mb-2" />
  <v-list
    :items="enhancedLinks"
    :lines="false"
    item-props />
</template>

<script setup lang="ts">
import { mdiChevronRight } from '@mdi/js'
import { computed } from 'vue'
import { useI18n } from 'vue-i18n';

const props = defineProps<{
  links: any[],
}>()

const { t } = useI18n()

const enhancedLinks = computed(() => {
  return [
    { type: 'subheader', title: t('moreAction') },
    ...props.links.map((link) => ({
      appendIcon: mdiChevronRight,
      ...link,
    }))
  ]
})
</script>

<i18n lang="yaml">
en:
  moreAction: More actions
fr:
  moreAction: Plus d'actions
</i18n>
