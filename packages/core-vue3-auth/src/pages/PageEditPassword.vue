<template>
  <app-header-bar
    :title="t('pageTitle')"
    button-mode="back"
    :default-back-to="{ name: 'Profile' }" />
  <v-container>
    <v-row justify="center">
      <v-col
        cols="12"
        sm="6"
        class="text-center">
        <h1 class="my-4 text-h5 text-primary">
          {{ t('title') }}
        </h1>
      </v-col>
    </v-row>
    <v-row justify="center">
      <v-col
        cols="12"
        sm="6">
        <v-form
          ref="form"
          :readonly="loading">
          <v-card flat>
            <v-card-text>
              <v-text-field
                v-model="request.oldPassword"
                :label="t('oldPassword')"
                :prepend-icon="mdiLockClock"
                :rules="[ required(), minLength(6), maxLength(200) ]"
                variant="underlined"
                density="comfortable"
                hide-details="auto"
                class="mb-3"
                autocomplete="current-password"
                type="password"
                required />
              <v-text-field
                v-model="request.password"
                :label="t('password')"
                :prepend-icon="mdiLock"
                :rules="[ required(), minLength(6), maxLength(200) ]"
                variant="underlined"
                density="comfortable"
                hide-details="auto"
                class="mb-3"
                autocomplete="new-password"
                type="password"
                required />
              <v-text-field
                v-model="request.confirmationPassword"
                :label="t('confirmationPassword')"
                :prepend-icon="mdiLock"
                :rules="[ required(), minLength(6), maxLength(200) ]"
                variant="underlined"
                density="comfortable"
                hide-details="auto"
                class="mb-3"
                autocomplete="new-password"
                type="password"
                required />
            </v-card-text>
            <v-card-text class="text-center">
              <v-btn
                :disabled="loading || !online"
                :loading="loading"
                :prepend-icon="mdiLockReset"
                color="warning"
                variant="text"
                @click="editPassword">
                {{ t('editPassword') }}
              </v-btn>
            </v-card-text>
          </v-card>
        </v-form>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
import { AppHeaderBar } from '@amilochau/core-vue3/src/components';
import { mdiLockReset, mdiLockClock, mdiLock } from '@mdi/js';
import { useCognito } from '../composition';
import { storeToRefs } from 'pinia';
import { useI18n } from 'vue-i18n';
import { useOnline } from '@vueuse/core';
import { ref } from 'vue';
import type { Ref } from 'vue';
import type { EditPassword } from '../types';
import { useAppStore, useHandle, useNavigation, usePage, useValidationRules } from '@amilochau/core-vue3';

usePage()
const { t } = useI18n()
const appStore = useAppStore()
const online = useOnline()
const { handleLoadAndError, handleFormValidation } = useHandle()
const { changePassword } = useCognito()
const { required, minLength, maxLength } = useValidationRules()
const { goBack } = useNavigation()

const { loading } = storeToRefs(appStore)

const form: Ref<any> = ref(null)
const request: Ref<EditPassword> = ref({
  oldPassword: '',
  password: '',
  confirmationPassword: '',
})

const editPassword = async () => {
  if (!await handleFormValidation(form)) {
    return
  }

  await handleLoadAndError(async () => {
    await changePassword(request.value)
    appStore.displayInfoMessage(t('successMessage'), undefined, 'snackbar')
    await goBack({ name: 'Profile' })
  }, 'snackbar')
}
</script>

<i18n lang="yaml">
en:
  pageTitle: Password change
  pageDescription: Password change page
fr:
  pageTitle: Modification de mot de passe
  pageDescription: Page de modification de mot de passe
</i18n>

<i18n lang="yaml">
en:
  title: Edit password
  oldPassword: Your old password
  password: Your new password
  confirmationPassword: Your new password, again
  editPassword: Edit password
  successMessage: Your password has been changed!
fr:
  title: Modification de mot de passe
  oldPassword: Votre ancien mot de passe
  password: Votre nouveau mot de passe
  confirmationPassword: Votre nouveau mot de passe, encore
  editPassword: Modifier le mot de passe
  successMessage: Votre mot de passe a bien été changé !
</i18n>
