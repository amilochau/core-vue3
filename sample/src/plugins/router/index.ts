import { createRouter, createWebHistory, RouteMeta, RouteRecordName, RouteRecordRaw } from 'vue-router'
import PageRoot from '../../pages/PageRoot.vue'
import PageLang from '../../pages/PageLang.vue'
import Routes from '../../data/routes'
import { registerGuards } from './guards'

const route: (path: string, name: RouteRecordName | undefined, component: any, meta: RouteMeta | undefined, children: any) => RouteRecordRaw = (path, name, component, meta, children) => {
  const hasChildren = Array.isArray(children)

  return {
    path,
    meta,
    name: hasChildren ? undefined : name,
    component,
    children: hasChildren
      ? children.map((r: any) => route(
        r.path,
        r.name,
        r.component,
        r.meta,
        r.children,
      ))
      : [],
  }
}

const routes : Array<RouteRecordRaw> = Routes
  .map((r: RouteRecordRaw) => route(
    r.path,
    r.name,
    r.component,
    r.meta,
    r.children,
  ))

const routesWithRedirection: Array<RouteRecordRaw> = [
  {
    path: '/:lang([a-z]{2})',
    component: PageRoot,
    children: routes
  },
  {
    path: '/:pathMatch(.*)*',
    component: PageLang
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes: routesWithRedirection,
  // @todo Add scrollBehavior
})

registerGuards(router);

export default router
