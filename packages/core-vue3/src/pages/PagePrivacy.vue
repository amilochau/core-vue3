<template>
  <v-container class="fill-height">
    <v-row>
      <v-col>
        <section>
          <app-section-header>{{ t('header11') }}</app-section-header>
          <app-section-text>{{ t('text11', { name: coreOptions.application.name }) }}</app-section-text>
        </section>
        <section>
          <app-section-header>{{ t('header21') }}</app-section-header>
          <app-section-text>{{ t('text21', { name: coreOptions.application.name }) }}</app-section-text>
          <app-section-sub-header>{{ t('header22') }}</app-section-sub-header>
          <app-section-text>{{ t('text22', { name: coreOptions.application.name }) }}</app-section-text>
          <app-section-sub-header>{{ t('header23') }}</app-section-sub-header>
          <app-section-text>{{ t('text23', { name: coreOptions.application.name }) }}</app-section-text>
          <app-section-sub-header>{{ t('header24') }}</app-section-sub-header>
          <app-section-text>{{ t('text24') }}</app-section-text>
          <app-section-sub-header>{{ t('header25') }}</app-section-sub-header>
          <app-section-text>{{ t('text25', { name: coreOptions.application.name, contact: coreOptions.application.contact }) }}</app-section-text>
          <app-section-sub-header>{{ t('header26') }}</app-section-sub-header>
          <app-section-text>{{ t('text26', { name: coreOptions.application.name }) }}</app-section-text>
          <app-section-sub-header>{{ t('header27') }}</app-section-sub-header>
          <app-section-text>{{ t('text27', { name: coreOptions.application.name }) }}</app-section-text>
          <app-section-sub-header>{{ t('header28') }}</app-section-sub-header>
          <app-section-text>{{ t('text28', { name: coreOptions.application.name }) }}</app-section-text>
        </section>
      </v-col>
    </v-row>
    <v-row class="cookies-bar-margin">
      <v-col>
        <p>
          {{ t('cookiesAccepted', { accepted: cookiesStore.cookiesAccepted }) }}
        </p>
        <v-btn
          class="bg-success mr-1"
          variant="text"
          @click="cookiesStore.acceptCookies">
          {{ t('accept') }}
        </v-btn>
        <v-btn
          class="bg-error mr-1"
          variant="text"
          @click="cookiesStore.refuseCookies">
          {{ t('refuse') }}
        </v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
import AppSectionHeader from '../components/app/section/AppSectionHeader.vue'
import AppSectionSubHeader from '../components/app/section/AppSectionSubHeader.vue'
import AppSectionText from '../components/app/section/AppSectionText.vue'
import { useI18n } from 'vue-i18n';
import { useCookiesStore } from '../stores';
import { useCoreOptions, usePage } from '../composition';

usePage()
const { t } = useI18n()
const coreOptions = useCoreOptions()
const cookiesStore = useCookiesStore()
</script>

<style lang="sass" scoped>
.cookies-bar-margin
  margin-bottom: 120px
</style>

<i18n lang="json">
  {
    "en": {
      "pageTitle": "Privacy",
      "pageDescription": "Privacy page"
    },
    "fr": {
      "pageTitle": "Confidentialit??",
      "pageDescription": "Page de confidentialit??"
    }
  }
</i18n>
<i18n lang="json">
  {
    "en": {
      "title": "Privacy",
      "header11": "Storage and removal",
      "text11": "Personal data are stored in the database, on the server where {name} has been installed. The physical localization of the server determines the legal framework applicable to your personal data. The information stored in the database is mapped to unique identifiers: modification of that information, including your account name, does not compromise the data integrity nor its confidentiality.",
      "header21": "Law # 78-17 from January 6th, 1978 on computerized treatments, files and freedom",
      "text21": "Law # 78-17 from January 6th, 1978 on computerized treatments, files and freedom is applicable to our handling of your personal data in {name}. The applicable text is available from the legifrance.gouv.fr web site.",
      "header22": "Data handling general purpose",
      "text22": "Collecting your personal data is justified by the operation of the {name} application. {name} brings you a number of services, such as offered from the home page of the application. Most of the collected data is directly related to the handling of the functionalities associated to those needs. Those data are stored as soon as you start using the application. Connection, navigation and error information provide us ways to make statistical analysis of {name} usage and operation.",
      "header23": "People affected",
      "text23": "Only registered users of {name} are affected by personal data collection: all collected data are associated to a registered user account.",
      "header24": "Recipient of the data",
      "text24": "No personal data is transmitted to nor used by any third party. Each registered user (having a personal user account) can also access his own information. An anonymous user can't access any information from other users.",
      "header25": "Supervision of the data handling",
      "text25": "Your personal data is handled by {name} under the supervision of {contact}. Storage and transfer of your personal data is done under the supervision of the site providing the server on which {name} is installed and the transfer medium.",
      "header26": "Retention period",
      "text26": "Your personal data are kept as long as your {name} user account exists. Your personal data are erased when your user account is suppressed, or when {name} is uninstalled from the server. Some personal data can be removed manually by user action.",
      "header27": "Access to the data",
      "text27": "Every {name} user is granted the right to get access to, modify, correct or remove their own personal data.",
      "header28": "Opposition to the handling of the data",
      "text28": "The removal of your user account gives you full ability to oppose the {name} handling of your personal data. You can also ask the person supervising {name} handling of the data to proceed with the removal of your user account. You might oppose some specific ways of handling your data through configuration options available in your user parameters.",
      "cookiesAccepted": "Cookies consent: {accepted}",
      "accept": "Accept",
      "refuse": "Refuse"
    },
    "fr": {
      "title": "Confidentialit??",
      "header11": "Stockage et suppression",
      "text11": "Des donn??es personnelles sont stock??es dans une base de donn??es, sur le serveur d'installation de {name}. La localisation physique du serveur d??termine le cadre r??glementatire applicable ?? ces donn??es personnelles. Les informations enregistr??es dans la base de donn??es sont li??es par des cl??s uniques : la modification de ces informations, y compris le nom du compte, ne compromet pas l'int??grit?? des donn??es ni leur confidentialit??.",
      "header21": "Loi n?? 78-17 du 6 janvier 1978 relative ?? l'informatique, aux fichiers et aux libert??s",
      "text21": "La loi n?? 78-17 du 6 janvier 1978 relative ?? l'informatique, aux fichiers et aux libert??s est applicable aux donn??es personnelles trait??es par {name}. Le texte en application est consultable sur le site legifrance.gouv.fr.",
      "header22": "Traitement g??n??ral des donn??es",
      "text22": "La collecte de vos donn??es personnelles est justifi??e par le fonctionnement de l'application {name}. {name} vous apporte un certain nombre de services, tels que propos??s d??s la page d'accueil de l'application. La plupart des donn??es collect??es sont directement li??es au traitement des fonctionnalit??s associ??es ?? ces besoins. Ces donn??es sont stock??es d??s que vous commencez ?? utiliser l'application. Les informations de connexion, de navigation et d'erreur nous fournissent des moyens d'effectuer une analyse statistique de l'utilisation et du fonctionnement de {name}.",
      "header23": "Public vis??",
      "text23": "Seuls les utilisateurs enregistr??s dans {name} sont concern??s par la collecte de donn??es personnelles : toutes les donn??es collect??es sont associ??es ?? un compte d'utilisateur enregistr??.",
      "header24": "Destinataire des donn??es",
      "text24": "Aucune donn??e personnelle n'est transmise ??, ni utilis??e par un tiers. Chaque utilisateur enregistr?? (disposant d'un compte utilisateur personnel) peut ??galement acc??der ?? ses propres informations. Un utilisateur anonyme ne peut pas acc??der aux informations des autres utilisateurs.",
      "header25": "Supervision du traitement des donn??es",
      "text25": "Vos donn??es personnelles sont trait??es par {name} sous la supervision de {contact}. Le stockage et le transfert de vos donn??es personnelles se font sous la supervision du site fournissant le serveur sur lequel {name} est install?? et le moyen de transfert de donn??es.",
      "header26": "Dur??e de conservation",
      "text26": "Vos donn??es personnelles sont conserv??es tant que votre compte utilisateur existe sur {name}. Vos donn??es personnelles sont effac??es lorsque votre compte d'utilisateur est supprim?? ou lorsque {name} est d??sinstall?? du serveur. Certaines donn??es personnelles peuvent ??tre supprim??es manuellement par l'action de l'utilisateur.",
      "header27": "Acc??s aux donn??es",
      "text27": "Chaque utilisateur de {name} a le droit d???acc??der, de modifier, de corriger ou de supprimer ses donn??es personnelles.",
      "header28": "Opposition au traitement des donn??es",
      "text28": "La suppression de votre compte utilisateur vous donne la pleine capacit?? de vous opposer au traitement par {name} de vos donn??es personnelles. Vous pouvez ??galement demander ?? la personne qui supervise le traitement des donn??es par {name} de proc??der ?? la suppression de votre compte utilisateur. Vous pouvez vous opposer ?? certains traitements sp??cifiques de vos donn??es via les options de configuration disponibles dans vos param??tres utilisateur.",
      "cookiesAccepted": "Consentement aux cookies : {accepted}",
      "accept": "Accepter",
      "refuse": "Refuser"
    }
  }
</i18n>
