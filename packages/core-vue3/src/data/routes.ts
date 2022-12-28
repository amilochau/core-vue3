import { RouteRecordRaw } from 'vue-router';

const routes: Array<RouteRecordRaw> = [
  { name: 'Privacy', path: 'privacy', component: () => import('../pages/PagePrivacy.vue') },
  { name: 'Profile', path: 'profile', component: () => import('../pages/identity/PageProfile.vue') },
  { name: 'Forbidden', path: 'forbidden', component: () => import('../pages/PageForbidden.vue') },
  { name: 'Register', path: 'register', component: () => import('../pages/identity/PageRegister.vue') },
  { name: 'ConfirmEmail', path: 'verify', component: () => import('../pages/identity/PageConfirmEmail.vue') },
  { name: 'Login', path: 'login', component: () => import('../pages/identity/PageLogin.vue') },
  { name: 'EditProfile', path: 'edit-profile', component: () => import('../pages/identity/PageEditProfile.vue') },
  { name: 'EditPassword', path: 'edit-password', component: () => import('../pages/identity/PageEditPassword.vue') },
  { name: 'DeleteAccount', path: 'delete-account', component: () => import('../pages/identity/PageDeleteAccount.vue') },
  { name: 'NotFound', path: ':pathMatch(.*)*', component: () => import('../pages/PageNotFound.vue') },
]

export default routes
