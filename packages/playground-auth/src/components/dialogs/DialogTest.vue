<template>
  <v-dialog
    :model-value="modelValue"
    :fullscreen="xs"
    persistent
    scrollable
    max-width="600px"
    @update:model-value="emits('update:modelValue', $event)">
    <v-form
      ref="form"
      :readonly="loading"
      class="fill-height overflow-y-auto"
      @submit.prevent="save">
      <v-card>
        <card-title-closable
          title="Test dialog"
          @close="close" />
        <v-card-text class="pt-2">
          <v-text-field
            v-model="request.name"
            label="Required text"
            :rules="[ required(), minLength(2) ]"
            variant="underlined"
            density="comfortable"
            hide-details="auto"
            class="mb-3"
            required />
          <v-textarea
            v-model="request.desc"
            label="Required long test"
            :rules="[ minLength(10) ]"
            variant="underlined"
            density="comfortable"
            hide-details="auto"
            class="mb-3"
            rows="3" />
        </v-card-text>
        <card-messages />
        <card-actions
          :save-icon="mdiPlus"
          save-title="Validate & display snackbar"
          @close="close"
          @save="save" />
      </v-card>
    </v-form>
  </v-dialog>
</template>

<script setup lang="ts">
import { mdiAlert, mdiPlus } from "@mdi/js"
import { storeToRefs } from 'pinia';
import { ref, watch } from "vue";
import type { Ref } from "vue";
import { CardActions, CardMessages, CardTitleClosable } from "@amilochau/core-vue3/src/components"
import { MapsCreateRequest } from "../../types/maps";
import { ApplicationMessage, useAppStore, useHandle, useValidationRules } from "@amilochau/core-vue3";
import { useDisplay } from "vuetify";
import { useI18n } from "vue-i18n";

const { t } = useI18n()
const appStore = useAppStore()
const { handleLoadAndError, handleFormValidation } = useHandle()
const { required, minLength } = useValidationRules()
const { xs } = useDisplay()

const { loading } = storeToRefs(appStore)

const props = defineProps<{
  modelValue: boolean
}>()

const emits = defineEmits<{
  (eventName: 'update:modelValue', value: boolean): void
}>()

const form: Ref<any> = ref(null)
const request: Ref<MapsCreateRequest> = ref(new MapsCreateRequest())

async function save() {
  if (!await handleFormValidation(form)) {
    return
  }

  await handleLoadAndError(() => {
    throw new ApplicationMessage(t('testMessage'), 'error', mdiAlert, `Important details to display in the snackbar
    New line here`)
  }, 'internal')
}

watch(() => props.modelValue, () => props.modelValue ? open() : close())

function open() {
  initMap()
  form.value?.reset()
}
function close() {
  emits('update:modelValue', false)
}

function initMap() {
  request.value = new MapsCreateRequest();
}
</script>

<i18n lang="json">
  {
    "en": {
      "close": "Close",
      "testMessage": "Test message"
    },
    "fr": {
      "close": "Fermer",
      "testMessage": "Test message"
    }
  }
</i18n>
