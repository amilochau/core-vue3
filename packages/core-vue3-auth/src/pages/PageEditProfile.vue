<template>
  <app-header-bar
    :title="t('pageTitle')"
    button-mode="back"
    :default-back-to="{ name: 'Profile' }" />
  <app-responsive-form
    :title="t('title')"
    :button="{
      title: t('editProfile'),
      icon: mdiAccountEdit,
      onClick: editProfile,
      color: 'primary',
    }">
    <v-card-text>
      <card-section-title
        :icon="mdiCardAccountDetailsOutline"
        :title="t('profileSection.title')" />
      <v-text-field
        v-model="request.name"
        :label="t('name')"
        :prepend-icon="mdiAccount"
        :rules="[ required(), maxLength(200) ]"
        variant="underlined"
        density="comfortable"
        hide-details="auto"
        class="mb-3"
        autocomplete="name"
        type="text"
        required />
    </v-card-text>
  </app-responsive-form>
</template>

<script setup lang="ts">
import { AppHeaderBar, AppResponsiveForm, CardSectionTitle } from '@amilochau/core-vue3/src/components';
import { mdiAccountEdit, mdiAccount, mdiCardAccountDetailsOutline } from '@mdi/js';
import { useCognito } from '../composition';
import { storeToRefs } from 'pinia';
import { useI18n } from 'vue-i18n';
import { ref, type Ref } from 'vue';
import type { EditProfile } from '../types';
import { useAppStore, useHandle, useIdentityStore, useNavigation, usePage, useValidationRules } from '@amilochau/core-vue3';

usePage()
const { t } = useI18n()
const appStore = useAppStore()
const identityStore = useIdentityStore()
const { handleLoadAndError } = useHandle()
const { updateAttributes, fetchUserAttributes } = useCognito()
const { required, maxLength } = useValidationRules()
const { goBack } = useNavigation()

const { attributes } = storeToRefs(identityStore)

const request: Ref<EditProfile> = ref({
  name: attributes.value.name
})

const editProfile = () => handleLoadAndError(async () => {
  await updateAttributes(request.value)
  appStore.displayInfoMessage(t('successMessage'), undefined, 'snackbar')
  await goBack({ name: 'Profile' })
  fetchUserAttributes()
}, 'snackbar')
</script>

<i18n lang="yaml">
en:
  pageTitle: Profile change
  pageDescription: Profile change page
fr:
  pageTitle: Modification de profil
  pageDescription: Page de modification de profil
</i18n>

<i18n lang="yaml">
en:
  title: Edit profile
  profileSection:
    title: Personal data
  name: Your name
  editProfile: Edit profile
  successMessage: Your profile has been changed!
fr:
  title: Modification de profil
  profileSection:
    title: Données personnelles
  name: Votre nom
  editProfile: Modifier le profil
  successMessage: Votre profil a bien été changé !
</i18n>
