<template>
  <v-input
    v-model:model-value="modelValue"
    :focused="focused"
    :rules="rules"
    :disabled="disabled"
    class="mb-1">
    <v-field
      :label="label"
      :focused="focused"
      :disabled="disabled"
      variant="plain"
      active>
      <div class="colors-grid">
        <div
          v-for="(color, i) in colors"
          :key="i"
          :style="{ 'background-color': color }"
          class="colors-grid-cell"
          :class="{ 'colors-grid-cell__selected': color === modelValue }"
          tabindex="0"
          @focus="focused = true"
          @blur="focused = false"
          @click="modelValue = color">
          <v-icon
            v-if="color === modelValue"
            :icon="mdiCheck"
            class="text-white"
            size="x-small" />
        </div>
      </div>
    </v-field>
    <template #append>
      <v-icon
        :color="modelValue"
        :icon="mdiPalette"
        class="full-opacity"
        start
        @click="displayDialog = !displayDialog" />
      <v-icon
        :icon="mdiClose"
        @click="reset" />
    </template>
  </v-input>
  <v-dialog
    v-model="displayDialog"
    scrollable
    width="auto">
    <v-card>
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
import { mdiCheck, mdiClose, mdiPalette } from '@mdi/js'
import { type Ref, computed, ref, watch } from 'vue';
import { useI18n } from 'vue-i18n';

const props = defineProps<{
  /** Title used as the input label */
  label?: string
  /** Validation rules */
  rules?: any[]
  /** Whether the input is disabled */
  disabled?: boolean
  /** Title used for the reset button, in the detailed dialog */
  resetTitle?: string,
  /** Title used for the save button, in the detailed dialog */
  saveTitle?: string,
  /** Colors used as values */
  colors: string[],
}>()

const modelValue = defineModel<string | undefined>()

const { t } = useI18n()

const displayDialog = ref(false)
const internalValue: Ref<string | undefined> = ref(undefined)
const focused = ref(false)

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
    reset: props.resetTitle ?? t('reset'),
    save: props.saveTitle ?? t('save'),
  }
})
</script>

<i18n lang="yaml">
en:
  reset: Reset
  save: Save
fr:
  reset: Supprimer
  save: Sauvegarder
</i18n>

<style>
.colors-grid {
  display: flex;
  flex-wrap: wrap;
  align-items: start;
  justify-content: center;
  width: 100%;
  padding-top: 16px;
  padding-bottom: 16px;
}
.colors-grid-cell {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 20px !important;
  width: 20px !important;
  margin: 2px;
  cursor: pointer;
  border-radius: 50%;
  transition-property: none;
}
.colors-grid-cell:hover {
  height: 32px !important;
  width: 32px !important;
  margin: -4px;
}
.colors-grid-cell__selected {
  height: 32px !important;
  width: 32px !important;
  margin: -4px;
  border: 1px solid #515151;
  z-index: 1;
}
.colors-grid-cell__selected:hover {
  border-width: 2px !important;
}
</style>
