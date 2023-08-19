<template>
  <app-header-bar
    :title="t('pageTitle')"
    button-mode="back"
    :default-back-to="{ name: 'Login' }" />
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
          <v-card
            elevation="0">
            <v-card-text>
              <v-text-field
                v-model="request.email"
                :label="t('email')"
                :prepend-icon="mdiAt"
                :rules="[ required(), maxLength(200), emailAddress() ]"
                variant="underlined"
                density="comfortable"
                hide-details="auto"
                class="mb-3"
                autocomplete="email"
                type="email"
                inputmode="email"
                required />
            </v-card-text>
            <v-card-text class="text-center">
              <v-btn
                :disabled="loading || !online"
                :loading="loading"
                :prepend-icon="mdiLockReset"
                color="primary"
                variant="text"
                @click="reset">
                {{ t('reset') }}
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
import { mdiLockReset, mdiAt } from '@mdi/js';
import { useCognito } from '../composition';
import { storeToRefs } from 'pinia';
import { useI18n } from 'vue-i18n';
import { useOnline } from '@vueuse/core';
import { ref } from 'vue';
import type { Ref } from 'vue';
import { useRouter } from 'vue-router';
import type { ForgotPassword } from "../types"
import { useAppStore, useHandle, usePage, useValidationRules } from '@amilochau/core-vue3';

usePage()
const { t } = useI18n()
const appStore = useAppStore()
const online = useOnline()
const router = useRouter()
const { handleLoadAndError, handleFormValidation } = useHandle()
const { forgotPassword } = useCognito()
const { required, maxLength, emailAddress } = useValidationRules()

const { loading } = storeToRefs(appStore)

const form: Ref<any> = ref(null)
const request: Ref<ForgotPassword> = ref({
  email: ''
})

const reset = async() => {
  if (!await handleFormValidation(form)) {
    return
  }

  await handleLoadAndError(async () => {
    await forgotPassword(request.value)
    appStore.displayInfoMessage(t('successMessage'), t('successDetails'), 'snackbar')
    await router.push({ name: 'ResetPassword', query: { email: request.value.email } })
  }, 'snackbar')
}
</script>

<i18n lang="json">
  {
    "en": {
      "pageTitle": "Forgot password",
      "pageDescription": "Password forgotten page"
    },
    "fr": {
      "pageTitle": "Mot de passe oublié",
      "pageDescription": "Page de mot de passe oublié"
    }
  }
</i18n>
<i18n lang="json">
  {
    "en": {
      "title": "Password forgotten",
      "email": "Your email address",
      "reset": "Reset password",
      "successMessage": "Your password has been reset!",
      "successDetails": "An email with the reset code has been sent to you. Check your spams if you don't find it!"
    },
    "fr": {
      "title": "Mot de passe oublié",
      "email": "Votre adresse email",
      "reset": "Réinitialiser le mot de passe",
      "successMessage": "Votre mot de passe a été réinitialisé !",
      "successDetails": "Un email avec le code de réinitialisation vous a été envoyé. Vérifiez vos spams si vous ne le trouvez pas !"
    }
  }
</i18n>
