import { RouteRecordRaw } from 'vue-router';

const routes: Array<RouteRecordRaw> = [
  { name: 'Privacy', path: '/:lang([a-z]{2})/privacy', component: () => import('../pages/PagePrivacy.vue'), meta: { requiresAuth: true } },
  { name: 'Forbidden', path: '/:lang([a-z]{2})/forbidden', component: () => import('../pages/PageForbidden.vue') },
  { name: 'NotFound', path: '/:lang([a-z]{2})/:pathMatch(.*)*', component: () => import('../pages/PageNotFound.vue') },
]

export default routes
