import type { RouteRecordRaw } from 'vue-router';

const routes: Array<RouteRecordRaw> = [
  { name: 'Register', path: 'register', component: () => import('../pages/PageRegister.vue') },
  { name: 'ConfirmEmail', path: 'verify', component: () => import('../pages/PageConfirmEmail.vue') },
  { name: 'ForgotPassword', path: 'forgot-password', component: () => import('../pages/PageForgotPassword.vue') },
  { name: 'ResetPassword', path: 'reset-password', component: () => import('../pages/PageResetPassword.vue') },
  { name: 'SetPassword', path: 'set-password', component: () => import('../pages/PageSetPassword.vue') },
  { name: 'Login', path: 'login', component: () => import('../pages/PageLogin.vue') },
  { name: 'Profile', path: 'profile', component: () => import('../pages/PageProfile.vue'), meta: { requiresAuth: true } },
  { name: 'EditProfile', path: 'edit-profile', component: () => import('../pages/PageEditProfile.vue'), meta: { requiresAuth: true } },
  { name: 'EditPassword', path: 'edit-password', component: () => import('../pages/PageEditPassword.vue'), meta: { requiresAuth: true } },
  { name: 'DeleteAccount', path: 'delete-account', component: () => import('../pages/PageDeleteAccount.vue'), meta: { requiresAuth: true } },
];

export default routes;
