<template>
  <v-dialog
    v-model="modelValue"
    :fullscreen="xs"
    persistent
    scrollable
    max-width="600px">
    <v-form
      ref="form"
      :readonly="loading"
      class="fill-height overflow-y-auto"
      @submit.prevent="save">
      <v-card>
        <card-title-closable
          :title="t('title')"
          @close="close" />
        <v-card-text class="pt-2">
          <v-text-field
            v-model="request.name"
            label="Required text"
            :rules="[ required(), minLength(2) ]"
            required />
          <v-textarea
            v-model="request.desc"
            label="Required long test"
            :rules="[ minLength(10) ]" />
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
import { type Ref, ref, watch } from "vue";
import { CardActions, CardMessages, CardTitleClosable } from "@amilochau/core-vue3/components"
import { MapsCreateRequest } from "../../types/maps";
import { ApplicationMessage } from "@amilochau/core-vue3/types";
import { useAppStore } from "@amilochau/core-vue3/stores";
import { useHandle, useValidationRules } from "@amilochau/core-vue3/composition";
import { useDisplay } from "vuetify";
import { useI18n } from "vue-i18n";

const { t } = useI18n()
const appStore = useAppStore()
const { handleLoadAndError, handleFormValidation } = useHandle()
const { required, minLength } = useValidationRules()
const { xs } = useDisplay()

const { loading } = storeToRefs(appStore)

const modelValue = defineModel<boolean>({ required: true })

const form: Ref<any> = ref(null)
const request: Ref<MapsCreateRequest> = ref(new MapsCreateRequest())

const save = async () => {
  if (!await handleFormValidation(form)) {
    return
  }

  await handleLoadAndError(() => {
    throw new ApplicationMessage(t('testMessage'), 'error', mdiAlert, `Important details to display in the snackbar
    New line here`)
  }, 'internal')
}

watch(modelValue, () => modelValue.value ? open() : close())

const open = () => {
  initMap()
  form.value?.reset()
}
const close = () => {
  modelValue.value = false
}

const initMap = () => {
  request.value = new MapsCreateRequest();
}
</script>

<i18n lang="yaml">
en:
  title: Test dialog
  close: Close
  testMessage: Test message
fr:
  title: Dialog de test
  close: Fermer
  testMessage: Test message
</i18n>
