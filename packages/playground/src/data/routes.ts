import type { RouteRecordRaw } from 'vue-router';

const routes: Array<RouteRecordRaw> = [
  { name: 'Home', path: '', component: () => import('../pages/PageHome.vue') },
  { name: 'Components', path: 'components', component: () => import('../pages/PageComponents.vue') },
  { name: 'Dialogs', path: 'dialogs', component: () => import('../pages/PageDialogs.vue') },
  { name: 'Validations', path: 'validations', component: () => import('../pages/PageValidations.vue') },
];

export default routes;
