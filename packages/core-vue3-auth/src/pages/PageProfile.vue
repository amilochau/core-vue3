<template>
  <app-responsive
    :title="t('title')"
    :links="links">
    <v-card
      class="mt-4"
      elevation="2">
      <v-card-text class="pb-0">
        <card-section-title
          :icon="mdiCardAccountDetailsOutline"
          :title="t('profileSection.title')" />
        <v-list :items="contactItems" />
      </v-card-text>
    </v-card>
  </app-responsive>
</template>

<script setup lang="ts">
import { AppResponsive, CardSectionTitle } from '@amilochau/core-vue3/components';
import { mdiAccount, mdiAccountEdit, mdiAccountOff, mdiAt, mdiCardAccountDetailsOutline, mdiLockReset, mdiPower } from '@mdi/js';
import { storeToRefs } from 'pinia';
import { computed } from 'vue';
import { useI18n } from 'vue-i18n';
import { useRouter } from 'vue-router';
import { useCoreOptions, usePage } from '@amilochau/core-vue3/composition';
import { useAppStore, useIdentityStore } from '@amilochau/core-vue3/stores';
import { useCognito } from '../composition';

const { t } = useI18n();
usePage(computed(() => ({
  title: t('pageTitle'),
  description: t('pageDescription'),
  header: {
    buttonMode: 'back',
    defaultBackTo: { name: 'Home' },
  },
})));
const appStore = useAppStore();
const identityStore = useIdentityStore();
const router = useRouter();
const coreOptions = useCoreOptions();
const { signOut } = useCognito();

const { attributes } = storeToRefs(identityStore);

const links = computed(() => ([
  { title: t('links.editProfile.title'), subtitle: t('links.editProfile.subtitle'), prependIcon: mdiAccountEdit, to: { name: 'EditProfile' } },
  { title: t('links.editPassword.title'), subtitle: t('links.editPassword.subtitle'), prependIcon: mdiLockReset, to: { name: 'EditPassword' } },
  { title: t('links.logout.title'), subtitle: t('links.logout.subtitle'), prependIcon: mdiPower, onClick: logout },
  { title: t('links.deleteAccount.title'), subtitle: t('links.deleteAccount.subtitle'), prependIcon: mdiAccountOff, to: { name: 'DeleteAccount' } },
]));

const contactItems = computed(() => [{
  title: attributes.value.email,
  props: {
    prependIcon: mdiAt,
  },
}, {
  title: attributes.value.name,
  props: {
    prependIcon: mdiAccount,
  },
}]);

const logout = async () => {
  try {
    appStore.loading = true;
    await signOut();
    await router.push({ name: 'Home' });
  } finally {
    appStore.loading = false;
  }
};
</script>

<i18n lang="yaml">
en:
  pageTitle: Profile
  pageDescription: Profile page
fr:
  pageTitle: Profil
  pageDescription: Page de profil
</i18n>

<i18n lang="yaml">
en:
  title: Profile
  profileSection:
    title: Profile details
  links:
    editProfile:
      title: Edit your profile
      subtitle: Change your account information.
    editPassword:
      title: Edit password
      subtitle: Change your password when you want.
    logout:
      title: Logout
      subtitle: Logout to remove your personal data from this device.
    deleteAccount:
      title: Delete account
      subtitle: Remove your personal data by permanently deleting your account.
fr:
  title: Profil
  profileSection:
    title: Détails du profil
  links:
    editProfile:
      title: Modifier votre profil
      subtitle: Mettez à jour les informations de votre compte.
    editPassword:
      title: Modifier votre mot de passe
      subtitle: Changez de mot de passe à tout moment.
    logout:
      title: Se déconnecter
      subtitle: Déconnectez-vous pour supprimer vos informations personnelles de cet appareil.
    deleteAccount:
      title: Supprimer votre compte
      subtitle: Supprimez vos informations personnelles en détruisant définitivement votre compte.
</i18n>
