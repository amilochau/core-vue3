<template>
  <app-header-bar
    :title="t('pageTitle')"
    button-mode="back"
    :default-back-to="{ name: 'Home' }" />
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
        <v-card
          elevation="0">
          <v-card-text>
            <card-section-title
              :icon="mdiBrightness6"
              :title="t('display.title')" />
            <v-switch
              :model-value="themeStore.darkMode"
              :label="t('display.darkMode')"
              density="comfortable"
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
              color="primary"
              @update:model-value="toggleCookies" />
            <v-alert
              v-if="!cookiesStore.showCookies && cookiesStore.expiration"
              border="start"
              type="info"
              variant="tonal"
              class="mb-3">
              {{ t('privacy.expiration', { expirationDate: d(cookiesStore.expiration) }) }}
            </v-alert>
            <v-btn
              v-if="!cookiesStore.showCookies && cookiesStore.expiration"
              color="primary"
              block
              variant="tonal"
              :to="{ name: 'Privacy' }">
              {{ t('privacy.details') }}
            </v-btn>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
import { mdiBrightness6, mdiEarth, mdiGavel } from '@mdi/js'
import { AppHeaderBar, CardSectionTitle } from '../components'
import { useI18n } from 'vue-i18n';
import { usePage } from '../composition';
import { useRouter, useRoute } from 'vue-router';
import { useCookiesStore, useThemeStore } from '../stores';
import { useTheme } from 'vuetify'
import { computed } from 'vue';

usePage()
const { d, t } = useI18n()
const router = useRouter()
const route = useRoute()
const themeStore = useThemeStore()
const theme = useTheme()
const cookiesStore = useCookiesStore()

const languageItems = [
  { title: t('languages.english'), onClick: () => onClick('en'), prependAvatar: '/img/us/24.png', lang: 'en' },
  { title: t('languages.french'), onClick: () => onClick('fr'), prependAvatar: '/img/fr/24.png', lang: 'fr' }
]

const language = computed(() => route.params.lang?.toString())

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
    details: See privacy policy
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
    details: Voir la politique de confidentialité
</i18n>
