import type { RouteRecordRaw } from 'vue-router';

const routes: Array<RouteRecordRaw> = [
  {
    name: 'Home',
    path: '',
    component: () => import('../pages/PageHome.vue'),
    meta: {
      header: {
        title: 'heyy',
      }
    },
   },
]

export default routes
