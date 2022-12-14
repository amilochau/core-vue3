import { RouteRecordRaw } from 'vue-router';

const routes: Array<RouteRecordRaw> = [
  { name: 'Privacy', path: 'privacy', component: () => import('../pages/PagePrivacy.vue') },
  { name: 'Profile', path: 'profile', component: () => import('../pages/PageProfile.vue') },
  { name: 'Forbidden', path: 'forbidden', component: () => import('../pages/PageForbidden.vue') },
  { name: 'NotFound', path: ':pathMatch(.*)*', component: () => import('../pages/PageNotFound.vue') },
]

export default routes
