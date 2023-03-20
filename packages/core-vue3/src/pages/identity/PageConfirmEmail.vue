<template>
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
              <v-text-field
                v-model="request.code"
                :label="t('code')"
                :prepend-icon="mdiNumeric"
                :rules="[ required(), minLength(6), maxLength(8) ]"
                variant="underlined"
                density="comfortable"
                hide-details="auto"
                class="mb-3"
                autocomplete="one-time-code"
                type="text"
                required />
            </v-card-text>
            <v-card-text class="text-center">
              <v-btn
                :disabled="loading || !online"
                :loading="loading"
                :prepend-icon="mdiAccountCheck"
                color="primary"
                variant="text"
                @click="verifyCode">
                {{ t('verifyCode') }}
              </v-btn>
            </v-card-text>
          </v-card>
        </v-form>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
import { mdiAccountCheck, mdiAt, mdiNumeric } from '@mdi/js';
import { useCognito, useHandle, usePage, useValidationRules } from '../../composition';
import { useAppStore } from '../../stores';
import { storeToRefs } from 'pinia';
import { useI18n } from 'vue-i18n';
import { useOnline } from '@vueuse/core';
import { ref } from 'vue';
import type { Ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import type { ConfirmEmail } from '../../types';

usePage()
const { t } = useI18n()
const appStore = useAppStore()
const online = useOnline()
const route = useRoute()
const router = useRouter()
const { handleLoadAndError, handleFormValidation } = useHandle()
const { confirmRegistration } = useCognito()
const { required, minLength, maxLength, emailAddress } = useValidationRules()

const { loading } = storeToRefs(appStore)

const form: Ref<any> = ref(null)
const request: Ref<ConfirmEmail> = ref({
  email: route.query.email?.toString() || '',
  code: '',
})

async function verifyCode() {
  if (!await handleFormValidation(form)) {
    return
  }

  await handleLoadAndError(async () => {
    await confirmRegistration(request.value)
    appStore.displayInfoMessage(t('successMessage'), t('successDetails'), 'snackbar')
    router.push({ name: 'Login', query: { email: request.value.email } })
  }, 'snackbar')
}
</script>

<i18n lang="json">
  {
    "en": {
      "pageTitle": "Email confirmation",
      "pageDescription": "Email confirmation page"
    },
    "fr": {
      "pageTitle": "Confirmation d'email",
      "pageDescription": "Page de confirmation d'email"
    }
  }
</i18n>
<i18n lang="json">
  {
    "en": {
      "title": "Email confirmation",
      "email": "Your email address",
      "code": "Your verification code",
      "verifyCode": "Verify email address",
      "successMessage": "Your email address has now been verified!",
      "successDetails": "You can now sign in."
    },
    "fr": {
      "title": "Confirmation d'email",
      "email": "Votre adresse email",
      "code": "Votre code de vérification",
      "verifyCode": "Vérifier l'adresse email",
      "successMessage": "Votre adresse email a bien été vérifiée !",
      "successDetails": "Vous pouvez désormais vous connecter."
    }
  }
</i18n>
