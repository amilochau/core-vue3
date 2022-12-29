<template>
  <v-container>
    <v-row justify="center">
      <v-col
        cols="12"
        sm="6">
        <h2 class="mb-4 text-h6 text-center">
          {{ t('title') }}
        </h2>
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
                :readonly="emailReadonly"
                variant="underlined"
                density="comfortable"
                hide-details="auto"
                class="mb-3"
                type="email"
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
import { useCognito, usePage, useValidationRules } from '../../composition';
import { useAppStore } from '../../stores';
import { storeToRefs } from 'pinia';
import { useI18n } from 'vue-i18n';
import { useOnline } from '@vueuse/core';
import { Ref, ref, watch } from 'vue';
import { CognitoUserPool, CognitoUser } from 'amazon-cognito-identity-js'
import { useRoute, useRouter } from 'vue-router';

usePage()
const { t } = useI18n()
const appStore = useAppStore()
const online = useOnline()
const route = useRoute()
const router = useRouter()
const { userPoolData } = useCognito()
const { required, minLength, maxLength, emailAddress } = useValidationRules()

const { loading } = storeToRefs(appStore)

const form: Ref<any> = ref(null)
const request: Ref<any> = ref({})

// INIT & RELOAD PAGE (navigation)
request.value.email = route.query.email
const emailReadonly = ref(!!route.query.email)
watch(() => route.query.email, () => {
  if (route.query.email) {
    request.value.email = route.query.email
  }
  emailReadonly.value = !!route.query.email
})

async function verifyCode() {
  const { valid } = await form.value!.validate()
  if (!valid) {
    return;
  }

  const userPool = new CognitoUserPool(userPoolData)
  const user = new CognitoUser({ Username: request.value.email, Pool: userPool })
  user.confirmRegistration(request.value.code, true, (error, result) => {
    if (error) {
      appStore.displayErrorMessage(t('errorMessage'), error.message || JSON.stringify(error))
      return
    }

    appStore.displayInfoMessage(t('successMessage'), t('successDetails'))
    router.push({ name: 'Login', query: { email: request.value.email } })
  })
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
      "errorMessage": "An error occured.",
      "successMessage": "Your email address has now been verified!",
      "successDetails": "You can now sign in."
    },
    "fr": {
      "title": "Confirmation d'email",
      "email": "Votre adresse email",
      "code": "Votre code de vérification",
      "verifyCode": "Vérifier l'adresse email",
      "errorMessage": "Une erreur est survenue.",
      "successMessage": "Votre adresse email a bien été vérifiée !",
      "successDetails": "Vous pouvez désormais vous connecter."
    }
  }
</i18n>
