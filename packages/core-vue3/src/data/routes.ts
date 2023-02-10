import type { RouteRecordRaw } from 'vue-router';

const routes: Array<RouteRecordRaw> = [
  { name: 'Register', path: 'register', component: () => import('../pages/identity/PageRegister.vue') },
  { name: 'ConfirmEmail', path: 'verify', component: () => import('../pages/identity/PageConfirmEmail.vue') },
  { name: 'ForgotPassword', path: 'forgot-password', component: () => import('../pages/identity/PageForgotPassword.vue') },
  { name: 'ResetPassword', path: 'reset-password', component: () => import('../pages/identity/PageResetPassword.vue') },
  { name: 'Login', path: 'login', component: () => import('../pages/identity/PageLogin.vue') },
  { name: 'Profile', path: 'profile', component: () => import('../pages/identity/PageProfile.vue'), meta: { requiresAuth: true } },
  { name: 'EditProfile', path: 'edit-profile', component: () => import('../pages/identity/PageEditProfile.vue'), meta: { requiresAuth: true } },
  { name: 'EditPassword', path: 'edit-password', component: () => import('../pages/identity/PageEditPassword.vue'), meta: { requiresAuth: true } },
  { name: 'DeleteAccount', path: 'delete-account', component: () => import('../pages/identity/PageDeleteAccount.vue'), meta: { requiresAuth: true } },
  { name: 'Privacy', path: 'privacy', component: () => import('../pages/PagePrivacy.vue') },
  { name: 'Forbidden', path: 'forbidden', component: () => import('../pages/PageForbidden.vue') },
  { name: 'NotFound', path: ':pathMatch(.*)*', component: () => import('../pages/PageNotFound.vue') },
]

export default routes
