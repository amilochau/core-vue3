import { useI18n } from 'vue-i18n';
import type { RouteRecordRaw } from 'vue-router';

const useRoutes = () => {
  const { t, mergeLocaleMessage } = useI18n()

  mergeLocaleMessage('en', {
    privacy: {
      title: '',
      description: '',
    },
  })
  mergeLocaleMessage('fr', {
    privacy: {
      title: '',
      description: '',
    },
  })

}

const routes: Array<RouteRecordRaw> = [
  {
    name: 'Settings',
    path: 'settings',
    component: () => import('../pages/PageSettings.vue'),
  },
  {
    name: 'Privacy',
    path: 'privacy',
    component: () => import('../pages/PagePrivacy.vue'),
    meta: {
      header: {
        title: 'pageTitle',
        buttonMode: 'back',
        defaultBackTo: { name: 'Home' },
      }
    },
  },
  {
    name: 'Forbidden',
    path: 'forbidden',
    component: () => import('../pages/PageForbidden.vue'),
  },
  {
    name: 'NotFound',
    path: ':pathMatch(.*)*',
    component: () => import('../pages/PageNotFound.vue'),
  },
]

export default routes
