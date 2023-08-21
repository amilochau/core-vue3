<template>
  <app-responsive-form
    :title="t('title')"
    :button="{
      title: t('verifyCode'),
      icon: mdiAccountCheck,
      onClick: verifyCode,
      color: 'primary',
    }"
    :header="{
      title: t('pageTitle'),
      buttonMode: 'back',
      defaultBackTo: { name: 'Home' }
    }">
    <v-card-text>
      <card-section-title
        :icon="mdiAccountCheckOutline"
        :title="t('confirmEmailSection.title')" />
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
  </app-responsive-form>
</template>

<script setup lang="ts">
import { AppResponsiveForm, CardSectionTitle } from '@amilochau/core-vue3/src/components';
import { mdiAccountCheckOutline, mdiAccountCheck, mdiAt, mdiNumeric } from '@mdi/js';
import { useCognito } from '../composition';
import { useI18n } from 'vue-i18n';
import { ref, type Ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import type { ConfirmEmail } from '../types';
import { useAppStore, useHandle, usePage, useValidationRules } from '@amilochau/core-vue3';

usePage()
const { t } = useI18n()
const appStore = useAppStore()
const route = useRoute()
const router = useRouter()
const { handleLoadAndError } = useHandle()
const { confirmRegistration } = useCognito()
const { required, minLength, maxLength, emailAddress } = useValidationRules()

const request: Ref<ConfirmEmail> = ref({
  email: route.query.email?.toString() || '',
  code: '',
})

const verifyCode = () => handleLoadAndError(async () => {
  await confirmRegistration(request.value)
  appStore.displayInfoMessage(t('successMessage'), t('successDetails'), 'snackbar')
  await router.replace({ name: 'Login', query: { email: request.value.email } })
}, 'snackbar')
</script>

<i18n lang="yaml">
en:
  pageTitle: Email confirmation
  pageDescription: Email confirmation page
fr:
  pageTitle: Confirmation d'email
  pageDescription: Page de confirmation d'email
</i18n>

<i18n lang="yaml">
en:
  title: Email confirmation
  confirmEmailSection:
    title: Verification data
  email: Your email address
  code: Your verification code
  verifyCode: Verify email address
  successMessage: Your email address has now been verified!
  successDetails: You can now sign in.
fr:
  title: Confirmation d'email
  confirmEmailSection:
    title: Données de vérification
  email: Votre adresse email
  code: Votre code de vérification
  verifyCode: Vérifier l'adresse email
  successMessage: Votre adresse email a bien été vérifiée !
  successDetails: Vous pouvez désormais vous connecter.
</i18n>
