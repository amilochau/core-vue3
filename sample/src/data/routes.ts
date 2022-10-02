import { RouteRecordRaw } from 'vue-router';

const routes: Array<RouteRecordRaw> = [
  { name: 'Home', path: '/:lang([a-z]{2})/', component: () => import('../pages/PageHome.vue') },
  { name: 'Map', path: '/:lang([a-z]{2})/maps/:id', component: () => import('../pages/PageMap.vue'), meta: { requiresAuth: true } },
  { name: 'Accesses', path: '/:lang([a-z]{2})/maps/:id/accesses', component: () => import('../pages/PageAccesses.vue'), meta: { requiresAuth: true } },
  { name: 'Invitation', path: '/:lang([a-z]{2})/maps/:id/invitations/:invitationId', component: () => import('../pages/PageInvitation.vue'), meta: { requiresAuth: true } },
  { name: 'AnonymousMap', path: '/:lang([a-z]{2})/a/maps/:id', component: () => import('../pages/PageMap.vue'), meta: { anonymousRequests: true } },
  { name: 'AnonymousAccesses', path: '/:lang([a-z]{2})/a/maps/:id/accesses', component: () => import('../pages/PageAccesses.vue'), meta: { anonymousRequests: true } },
  { name: 'Privacy', path: '/:lang([a-z]{2})/privacy', component: () => import('../pages/PagePrivacy.vue'), meta: { requiresAuth: true } },
  { name: 'Forbidden', path: '/:lang([a-z]{2})/forbidden', component: () => import('../pages/PageForbidden.vue') },
  { name: 'NotFound', path: '/:lang([a-z]{2})/:pathMatch(.*)*', component: () => import('../pages/PageNotFound.vue') },
]

export default routes
