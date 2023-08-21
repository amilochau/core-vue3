<template>
  <app-responsive-form
    :title="t('title')"
    :links="links">
    <v-card-text>
      <card-section-title
        :icon="mdiBrightness6"
        :title="t('display.title')" />
      <v-switch
        :model-value="themeStore.darkMode"
        :label="t('display.darkMode')"
        density="comfortable"
        hide-details="auto"
        color="primary"
        class="mb-3"
        @update:model-value="toggleTheme" />
      <v-divider class="my-4" />
      <card-section-title
        :icon="mdiEarth"
        :title="t('languages.title')" />
      <v-chip-group
        :model-value="language"
        mandatory
        selected-class="text-primary">
        <v-chip
          v-for="(languageItem, i) in languageItems"
          :key="i"
          :value="languageItem.lang"
          @click="languageItem.onClick">
          {{ languageItem.title }}
        </v-chip>
      </v-chip-group>
      <v-divider class="my-4" />
      <card-section-title
        :icon="mdiGavel"
        :title="t('privacy.title')" />
      <v-switch
        :model-value="!cookiesStore.showCookies && cookiesStore.accepted"
        :label="t('privacy.cookies')"
        density="comfortable"
        hide-details="auto"
        color="primary"
        class="mb-3"
        @update:model-value="toggleCookies" />
      <v-alert
        v-if="!cookiesStore.showCookies && cookiesStore.expiration"
        border="start"
        type="info"
        variant="tonal"
        class="mb-3">
        {{ t('privacy.expiration', { expirationDate: d(cookiesStore.expiration) }) }}
      </v-alert>
    </v-card-text>
  </app-responsive-form>
</template>

<script setup lang="ts">
import { mdiBrightness6, mdiEarth, mdiGavel } from '@mdi/js'
import { AppResponsiveForm, CardSectionTitle } from '../components'
import { useI18n } from 'vue-i18n';
import { usePage } from '../composition';
import { useRouter, useRoute } from 'vue-router';
import { useCookiesStore, useThemeStore } from '../stores';
import { useTheme } from 'vuetify'
import { computed } from 'vue';

const { d, t } = useI18n()
usePage(computed(() => ({
  title: t('pageTitle'),
  description: t('pageDescription'),
  header: {
    buttonMode: 'back',
    defaultBackTo: { name: 'Home' }
  }
})))
const router = useRouter()
const route = useRoute()
const themeStore = useThemeStore()
const theme = useTheme()
const cookiesStore = useCookiesStore()

const language = computed(() => route.params.lang?.toString())
const languageItems = computed(() => ([
  { title: t('languages.english'), onClick: () => onClick('en'), prependAvatar: '/img/us/24.png', lang: 'en' },
  { title: t('languages.french'), onClick: () => onClick('fr'), prependAvatar: '/img/fr/24.png', lang: 'fr' },
]))

const links = computed(() => ([
  { title: t('links.privacy.title'), subtitle: t('links.privacy.subtitle'), prependIcon: mdiGavel, to: { name: 'Privacy' } },
]))

const onClick = async (lang: string) => {
  await router.replace({ params: { lang }, query: route.query })
}

const toggleTheme = () => {
  themeStore.darkMode = !themeStore.darkMode
  theme.global.name.value = themeStore.darkMode ? 'dark' : 'light'
}

const toggleCookies = (event: any) => {
  if (event as boolean) {
    cookiesStore.acceptCookies()
  } else {
    cookiesStore.refuseCookies()
  }
}
</script>

<i18n lang="yaml">
  en:
    pageTitle: Settings
    pageDescription: Settings page
  fr:
    pageTitle: Paramètres
    pageDescription: Page de paramètres
</i18n>

<i18n lang="yaml">
en:
  title: Settings
  languages:
    title: Languages
    english: English
    french: French
  display:
    title: Display
    darkMode: Dark mode
  privacy:
    title: Privacy
    cookies: Accept cookies
    expiration: Your answer expires on {expirationDate}. You'll then be asked again.
  links:
    privacy:
      title: Privacy policy
      subtitle: Read the privacy policy to understand which data we use, and why
fr:
  title: Paramètres
  languages:
    title: Langues
    english: English
    french: Français
  display:
    title: Affichage
    darkMode: Mode sombre
  privacy:
    title: Confidentialité
    cookies: Accepter les cookies
    expiration: Votre réponse expirera le {expirationDate}. Vous serez alors interrogé de nouveau.
  links:
    privacy:
      title: Politique de confidentialité
      subtitle: Lisez la politique de confidentialité, pour comprendre quelles données nous utilisons, et pourquoi
</i18n>
