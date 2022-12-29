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
                v-model="request.name"
                :label="t('name')"
                :prepend-icon="mdiAccount"
                :rules="[ required(), maxLength(200) ]"
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
                :prepend-icon="mdiAccountEdit"
                color="primary"
                variant="text"
                @click="editProfile">
                {{ t('editProfile') }}
              </v-btn>
            </v-card-text>
          </v-card>
        </v-form>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
import { mdiAccountEdit, mdiAccount } from '@mdi/js';
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
const { userPoolData, attributes, silentlyFetchAttributes } = useCognito()
const { required, maxLength } = useValidationRules()

const { loading } = storeToRefs(appStore)

const form: Ref<any> = ref(null)
const request: Ref<any> = ref({})

request.value.name = attributes.value.name

async function editProfile() {
  var validationResult = await form.value!.validate()
  if (!validationResult.valid) {
    return;
  }

  var attributes = [
    new CognitoUserAttribute({ Name: 'name', Value: request.value.name }),
  ]

  const userPool = new CognitoUserPool(userPoolData);
  const currentUser = userPool.getCurrentUser()
  currentUser?.getSession((error) => {
    if (error) {
      appStore.displayErrorMessage(t('errorMessage'), error.message || JSON.stringify(error))
      return
    }

    currentUser?.updateAttributes(attributes, (error, result) => {
      if (error) {
        appStore.displayErrorMessage(t('errorMessage'), error.message || JSON.stringify(error))
        return
      }

      appStore.displayInfoMessage(t('successMessage'))
      router.push({ name: 'Profile' })
      silentlyFetchAttributes()
    })
  })
}

</script>

<i18n lang="json">
  {
    "en": {
      "pageTitle": "Profile change",
      "pageDescription": "Profile change page"
    },
    "fr": {
      "pageTitle": "Modification de profil",
      "pageDescription": "Page de modification de profil"
    }
  }
</i18n>
<i18n lang="json">
  {
    "en": {
      "title": "Edit profile",
      "name": "Your name",
      "editProfile": "Edit profile",
      "errorMessage": "An error occured.",
      "successMessage": "Your profile has been changed!"
    },
    "fr": {
      "title": "Modification de profil",
      "name": "Votre nom",
      "editProfile": "Modifier le profil",
      "errorMessage": "Une erreur est survenue.",
      "successMessage": "Votre profil a bien été changé !"
    }
  }
</i18n>
