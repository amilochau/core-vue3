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
                :rules="[ required(), maxLength(200), emailAddress() ]"
                variant="underlined"
                density="comfortable"
                hide-details="auto"
                class="mb-3"
                type="email"
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
import { mdiLockReset } from '@mdi/js';
import { useCognitoClient, usePage, useValidationRules } from '../../composition';
import { useAppStore } from '../../stores';
import { storeToRefs } from 'pinia';
import { useI18n } from 'vue-i18n';
import { useOnline } from '@vueuse/core';
import { Ref, ref } from 'vue';
import { CognitoUserPool, CognitoUser } from 'amazon-cognito-identity-js'
import { useRouter } from 'vue-router';

usePage()
const { t } = useI18n()
const appStore = useAppStore()
const online = useOnline()
const router = useRouter()
const { userPoolData } = useCognitoClient()
const { required, maxLength, emailAddress } = useValidationRules()

const { loading } = storeToRefs(appStore)

const form: Ref<any> = ref(null)
const request: Ref<any> = ref({})

async function reset() {
  var validationResult = await form.value!.validate()
  if (!validationResult.valid) {
    return;
  }

  const userPool = new CognitoUserPool(userPoolData);
  const user = new CognitoUser({ Username: request.value.email, Pool: userPool })
  user.forgotPassword({
    onFailure: (error) => {
      appStore.displayErrorMessage(t('errorMessage'), error.message || JSON.stringify(error))
    },
    onSuccess: (result) => {
      appStore.displayInfoMessage(t('successMessage'), t('successDetails'))
      router.push({ name: 'ResetPassword', query: { email: request.value.email } })
    }
  })
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
      "errorMessage": "An error occured.",
      "successMessage": "Your password has been reset!",
      "successDetails": "An email with the reset code has been sent to you. Check your spams if you don't find it!"
    },
    "fr": {
      "title": "Mot de passe oublié",
      "email": "Votre adresse email",
      "reset": "Réinitialiser le mot de passe",
      "errorMessage": "Une erreur est survenue.",
      "successMessage": "Votre mot de passe a été réinitialisé !",
      "successDetails": "Un email avec le code de réinitialisation vous a été envoyé. Vérifiez vos spams si vous ne le trouvez pas !"
    }
  }
</i18n>
