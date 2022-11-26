<template>
  <v-form
    ref="form"
    :readonly="loading">
    <v-dialog
      :model-value="modelValue"
      :fullscreen="xs"
      max-width="600px"
      persistent
      scrollable
      @update:model-value="emits('update:modelValue', $event)">
      <v-card>
        <card-title-closable
          title="Test dialog"
          @close="close" />
        <v-card-text>
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
        <card-actions
          :save-icon="mdiPlus"
          save-title="Validate & display snackbar"
          @close="close"
          @save="save" />
      </v-card>
    </v-dialog>
  </v-form>
</template>

<script setup lang="ts">
import { mdiAbacus, mdiPlus } from "@mdi/js"
import { storeToRefs } from 'pinia';
import { Ref, ref, watch } from "vue";
import { MapsCreateRequest } from "../../types/maps";
import CardTitleClosable from '../cards/CardTitleClosable.vue';
import CardActions from '../cards/CardActions.vue';
import { useAppStore, useValidationRules } from "@amilochau/core-vue3";
import { useDisplay } from "vuetify";
import { useI18n } from "vue-i18n";

const { t } = useI18n()
const appStore = useAppStore()
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
  var validationResult = await form.value!.validate()
  if (!validationResult.valid) {
    return;
  }

  appStore.displayInfoMessage(t('testMessage'))
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
