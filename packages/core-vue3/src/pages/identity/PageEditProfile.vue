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
import { useAppStore, useIdentityStore } from '../../stores';
import { storeToRefs } from 'pinia';
import { useI18n } from 'vue-i18n';
import { useOnline } from '@vueuse/core';
import { ref } from 'vue';
import type { Ref } from 'vue';
import { useRouter } from 'vue-router';
import type { EditProfile } from '../../types';

usePage()
const { t } = useI18n()
const appStore = useAppStore()
const online = useOnline()
const router = useRouter()
const identityStore = useIdentityStore()
const { updateAttributes, fetchUserAttributes } = useCognito()
const { required, maxLength } = useValidationRules()

const { loading } = storeToRefs(appStore)
const { attributes } = storeToRefs(identityStore)

const form: Ref<any> = ref(null)
const request: Ref<EditProfile> = ref({
  name: attributes.value.name
})

async function editProfile() {
  const { valid } = await form.value!.validate()
  if (!valid) {
    return;
  }

  try {
    appStore.loading = true
    await updateAttributes(request.value)
    appStore.displayInfoMessage(t('successMessage'))
    router.push({ name: 'Profile' })
    fetchUserAttributes()
  } catch (error) {
    appStore.displayErrorMessage(t('errorMessage'), error as string)
  } finally {
    appStore.loading = false
  }
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
