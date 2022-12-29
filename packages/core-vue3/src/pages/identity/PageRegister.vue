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
          :readonly="loading"
          class="mb-4">
          <v-card
            elevation="0">
            <v-card-text>
              <v-text-field
                v-model="request.name"
                :label="t('name')"
                :prepend-icon="mdiAccount"
                :rules="[ required(), maxLength(200) ]"
                variant="underlined"
                density="comfortable"
                hide-details="auto"
                class="mb-3"
                required />
              <v-text-field
                v-model="request.email"
                :label="t('email')"
                :prepend-icon="mdiAt"
                :rules="[ required(), maxLength(200), emailAddress() ]"
                variant="underlined"
                density="comfortable"
                hide-details="auto"
                class="mb-3"
                type="email"
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
                type="password"
                required />
            </v-card-text>
            <v-card-text class="text-center">
              <v-btn
                :disabled="loading || !online"
                :loading="loading"
                :prepend-icon="mdiAccountPlus"
                color="primary"
                variant="text"
                @click="register">
                {{ t('register') }}
              </v-btn>
            </v-card-text>
          </v-card>
        </v-form>
        <h4 class="mb-4 text-body-2 font-italic text-center">
          {{ t('loginTitle') }}
          <v-btn
            :to="{ name: 'Login' }"
            density="compact"
            variant="text"
            class="ml-1">
            {{ t('loginLink') }}
          </v-btn>
        </h4>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
import { mdiAccountPlus, mdiAccount, mdiAt, mdiLock } from '@mdi/js';
import { useCognito, usePage, useValidationRules } from '../../composition';
import { useAppStore } from '../../stores';
import { storeToRefs } from 'pinia';
import { useI18n } from 'vue-i18n';
import { useOnline } from '@vueuse/core';
import { Ref, ref } from 'vue';
import { CognitoUserPool, CognitoUserAttribute } from 'amazon-cognito-identity-js'
import { useRouter } from 'vue-router';

usePage()
const { t } = useI18n()
const appStore = useAppStore()
const online = useOnline()
const router = useRouter()
const { userPoolData } = useCognito()
const { required, minLength, maxLength, emailAddress } = useValidationRules()

const { loading } = storeToRefs(appStore)

const form: Ref<any> = ref(null)
const request: Ref<any> = ref({})

async function register() {
  const { valid } = await form.value!.validate()
  if (!valid) {
    return;
  }

  var attributes = [
    new CognitoUserAttribute({ Name: 'email', Value: request.value.email }),
    new CognitoUserAttribute({ Name: 'name', Value: request.value.name }),
  ]

  const userPool = new CognitoUserPool(userPoolData);
  userPool.signUp(request.value.email, request.value.password, attributes, [], (error, result) => {
    if (error) {
      appStore.displayErrorMessage(t('errorMessage'), error.message || JSON.stringify(error))
      return
    }

    appStore.displayInfoMessage(t('successMessage'), t('successDetails'))
    router.push({ name: 'ConfirmEmail', query: { email: result?.user.getUsername() } })
  })
}

</script>

<i18n lang="json">
  {
    "en": {
      "pageTitle": "Register",
      "pageDescription": "Register page"
    },
    "fr": {
      "pageTitle": "Création de compte",
      "pageDescription": "Page de création de compte"
    }
  }
</i18n>
<i18n lang="json">
  {
    "en": {
      "title": "Register",
      "name": "Your name",
      "email": "Your email address",
      "password": "Your password",
      "confirmationPassword": "Your password, again",
      "register": "Create account",
      "errorMessage": "An error occured.",
      "successMessage": "Your account has now been created!",
      "successDetails": "You must confirm your email address - a code has been sent to you. Check your spams if you don't find it!",
      "loginTitle": "You already have an account?",
      "loginLink": "Login"
    },
    "fr": {
      "title": "Création de compte",
      "name": "Votre nom",
      "email": "Votre adresse email",
      "password": "Votre mot de passe",
      "confirmationPassword": "Votre mot de passe, encore",
      "register": "Créer le compte",
      "errorMessage": "Une erreur est survenue.",
      "successMessage": "Votre compte a bien été créé !",
      "successDetails": "Vous devez désormais confirmer votre addresse email - un code vous a été envoyé. Vérifiez vos spams si vous ne le trouvez pas !",
      "loginTitle": "Vous avez déjà un compte ?",
      "loginLink": "Se connecter"
    }
  }
</i18n>
