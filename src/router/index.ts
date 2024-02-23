import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import IndexHome from '../views/IndexHome.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'home',
    component: IndexHome
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
