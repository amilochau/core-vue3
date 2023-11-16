<template>
  <app-responsive-form
    :title="t('title')"
    :button="{
      title: t('verifyCode'),
      icon: mdiAccountCheck,
      onClick: verifyCode,
      color: 'primary',
    }">
    <v-alert
      border="start"
      type="info"
      variant="tonal"
      class="mb-3">
      {{ t('description') }}
    </v-alert>
    <v-alert
      border="start"
      type="warning"
      variant="tonal"
      class="mb-3">
      {{ t('spam') }}
    </v-alert>
    <v-card-text>
      <card-section-title
        :icon="mdiAccountCheckOutline"
        :title="t('confirmEmailSection.title')" />
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
        v-model="request.code"
        :label="t('code')"
        :prepend-icon="mdiNumeric"
        :rules="[ required(), minLength(6), maxLength(8) ]"
        autocomplete="one-time-code"
        type="text"
        required />
    </v-card-text>
  </app-responsive-form>
</template>

<script setup lang="ts">
import { AppResponsiveForm, CardSectionTitle } from '@amilochau/core-vue3/components';
import { mdiAccountCheck, mdiAccountCheckOutline, mdiAt, mdiNumeric } from '@mdi/js';
import { useCognito } from '../composition';
import { useI18n } from 'vue-i18n';
import { type Ref, computed, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import type { ConfirmEmail } from '../types';
import { useAppStore } from '@amilochau/core-vue3/stores';
import { useHandle, usePage, useValidationRules } from '@amilochau/core-vue3/composition';

const { t } = useI18n()
usePage(computed(() => ({
  title: t('pageTitle'),
  description: t('pageDescription'),
  header: {
    buttonMode: 'back',
    defaultBackTo: { name: 'Home' },
  },
})))
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
  appStore.displayInfoMessage({ title: t('successMessage'), details: t('successDetails') }, 'snackbar')
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
  description: We have to validate your email address. We just sent an email to you, with a code. You can now enter this code here to continue.
  spam: If you didn't receive this email, you can check your spam folder. Please also check that you didn't make a mistake in your email address!
  confirmEmailSection:
    title: Verification data
  email: Your email address
  code: Your verification code
  verifyCode: Verify email address
  successMessage: Your email address has now been verified!
  successDetails: You can now sign in.
fr:
  title: Confirmation d'email
  description: Nous devons valider votre adresse email. Nous venons de vous envoyer un email, avec un code. Vous pouvez désormais entrer ce code ici pour continuer.
  spam: Si vous n'avez pas reçu l'email, vous pouvez vérifier dans votre dossier de spams. Vous pouvez également vérifier que vous n'avez pas fait d'erreur dans votre adresse email !
  confirmEmailSection:
    title: Données de vérification
  email: Votre adresse email
  code: Votre code de vérification
  verifyCode: Vérifier l'adresse email
  successMessage: Votre adresse email a bien été vérifiée !
  successDetails: Vous pouvez désormais vous connecter.
</i18n>
