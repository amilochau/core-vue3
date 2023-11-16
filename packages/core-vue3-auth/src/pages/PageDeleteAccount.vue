<template>
  <app-responsive-form
    :title="t('title')"
    :button="{
      title: t('deleteAccount'),
      icon: mdiAccountOff,
      onClick: deleteAccount,
      color: 'error',
    }">
    <v-card-text>
      <card-section-title
        :icon="mdiCardAccountDetailsOutline"
        :title="t('accountSection.title')" />
      <v-text-field
        v-model="request.email"
        :label="t('email')"
        :prepend-icon="mdiAt"
        :rules="[ required(), maxLength(200), emailAddress() ]"
        autocomplete="email"
        type="email"
        inputmode="email"
        required />
      <v-text-field
        v-model="request.password"
        :label="t('password')"
        :prepend-icon="mdiLock"
        :rules="[ required(), minLength(6), maxLength(200) ]"
        autocomplete="current-password"
        type="password"
        required />
    </v-card-text>
  </app-responsive-form>
</template>

<script setup lang="ts">
import { AppResponsiveForm, CardSectionTitle } from '@amilochau/core-vue3/components';
import { mdiAccountOff, mdiAlert, mdiAt, mdiCardAccountDetailsOutline, mdiLock } from '@mdi/js';
import { useCognito } from '../composition';
import { useI18n } from 'vue-i18n';
import { type Ref, computed, ref } from 'vue';
import { useRouter } from 'vue-router';
import type { Login } from '../types';
import { useAppStore, useIdentityStore } from '@amilochau/core-vue3/stores';
import { useClean, useHandle, usePage, useValidationRules } from '@amilochau/core-vue3/composition';
import { storeToRefs } from 'pinia'
import type { ApplicationMessage } from '@amilochau/core-vue3/types';

const { t } = useI18n()
usePage(computed(() => ({
  title: t('pageTitle'),
  description: t('pageDescription'),
  header: {
    buttonMode: 'back',
    defaultBackTo: { name: 'Profile' },
  }
})))
const appStore = useAppStore()
const { clean } = useClean()
const router = useRouter()
const identityStore = useIdentityStore()
const { handleLoadAndError } = useHandle()
const { deleteUser } = useCognito()
const { required, minLength, maxLength, emailAddress } = useValidationRules()
const { attributes } = storeToRefs(identityStore)

const request: Ref<Login> = ref({
  email: '',
  password: '',
})

const deleteAccount = () => handleLoadAndError(async () => {
  if (request.value.email !== attributes.value.email) {
    throw { title: t('incorrectEmailAddress'), color: 'error', icon: mdiAlert, details: '' } as ApplicationMessage
  }

  await deleteUser()
  identityStore.isAuthenticated = false
  clean();
  appStore.displayInfoMessage({ title: t('successMessage') }, 'snackbar')
  await router.push({ name: 'Home' })
}, 'snackbar')
</script>

<i18n lang="yaml">
en:
  pageTitle: Account deletion
  pageDescription: Account deletion page
fr:
  pageTitle: Suppression de compte
  pageDescription: Page de suppression de compte
</i18n>

<i18n lang="yaml">
en:
  title: Delete account
  accountSection:
    title: Account data
  email: Your email address
  password: Your password
  deleteAccount: Delete account
  incorrectEmailAddress: Incorrect email address.
  successMessage: Your account has been deleted!
fr:
  title: Suppression de compte
  accountSection:
    title: Données du compte
  email: Votre adresse email
  password: Votre mot de passe
  deleteAccount: Supprimer le compte
  incorrectEmailAddress: Adresse email incorrecte.
  successMessage: Votre compte a bien été supprimé !
</i18n>
