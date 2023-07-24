<template>
  <v-text-field
    :model-value="modelValue"
    :label="labels.title"
    variant="underlined"
    density="comfortable"
    hide-details="auto"
    type="text"
    class="mb-3"
    readonly
    attach
    @click:control="displayDialog = !displayDialog">
    <template #append>
      <v-icon
        :color="modelValue"
        :icon="mdiPalette"
        class="full-opacity"
        @click="displayDialog = !displayDialog" />
    </template>
  </v-text-field>
  <v-dialog
    v-model="displayDialog"
    scrollable>
    <v-card max-width="300px">
      <v-color-picker
        v-model="internalValue"
        :swatches="swatches"
        :modes="['hexa']"
        show-swatches
        swatches-max-height="160px"
        elevation="0" />
      <v-card-actions>
        <v-spacer />
        <v-btn
          color="error"
          @click="reset">
          {{ labels.reset }}
        </v-btn>
        <v-btn
          color="primary"
          @click="save">
          {{ labels.save }}
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script setup lang="ts">
import { swatches } from '../../data/swatches'
import { mdiPalette } from "@mdi/js"
import { computed, ref, watch, type Ref } from 'vue';
import { useI18n } from 'vue-i18n';

const modelValue = defineModel<string | undefined>()

const props = defineProps<{
  labelTitle?: string
  resetTitle?: string,
  saveTitle?: string,
}>()

const { t } = useI18n()

const displayDialog = ref(false)
const internalValue: Ref<string | undefined> = ref(undefined)

function reset() {
  modelValue.value = undefined
  displayDialog.value = false
}

function save() {
  modelValue.value = internalValue.value
  displayDialog.value = false
}

watch(modelValue, () => {
  internalValue.value = modelValue.value
}, { immediate: true })

const labels = computed(() => {
  return {
    title: props.labelTitle ?? t('title'),
    reset: props.resetTitle ?? t('reset'),
    save: props.saveTitle ?? t('save'),
  }
})
</script>

<i18n lang="json">
  {
    "en": {
      "title": "Color",
      "reset": "Reset",
      "save": "Save"
    },
    "fr": {
      "title": "Couleur",
      "reset": "Supprimer",
      "save": "Sauvegarder"
    }
  }
</i18n>

<style>
.full-opacity {
  opacity: 1 !important;
}
</style>
