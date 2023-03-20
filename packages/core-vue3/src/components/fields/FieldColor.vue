<template>
  <v-text-field
    :model-value="modelValue"
    :label="labelTitle"
    variant="underlined"
    density="comfortable"
    hide-details="auto"
    type="text"
    class="mb-3"
    readonly
    @click:control="display = !display">
    <template #append>
      <v-icon
        :color="modelValue"
        :icon="mdiPalette"
        @click="display = !display" />
    </template>
  </v-text-field>
  <v-dialog
    v-model="display"
    scrollable>
    <v-card max-width="300px">
      <v-color-picker
        v-model="internalColor"
        :swatches="swatches"
        :modes="modes"
        show-swatches
        swatches-max-height="160px"
        elevation="0" />
      <v-card-actions>
        <v-spacer />
        <v-btn
          color="error"
          @click="reset">
          {{ resetTitle }}
        </v-btn>
        <v-btn
          color="primary"
          @click="save">
          {{ saveTitle }}
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script setup lang="ts">
import swatches from '../../data/swatches'
import { mdiPalette } from "@mdi/js"
import { ref, watch } from 'vue';
import type { Ref } from 'vue';

const props = defineProps<{
  modelValue?: string,
  labelTitle: string
  resetTitle: string,
  saveTitle: string
}>()

const emits = defineEmits<{
  (eventName: 'update:modelValue', value?: string): void
}>()

const modes = [ "rgba" ]

const display = ref(false)
const internalColor: Ref<string | undefined> = ref('')

function reset() {
  emits('update:modelValue', undefined)
  display.value = false
}

function save() {
  emits('update:modelValue', internalColor.value)
  display.value = false
}

watch(() => props.modelValue, () => {
  internalColor.value = props.modelValue
})
watch(() => display.value, () => {
  internalColor.value = props.modelValue
})
</script>
