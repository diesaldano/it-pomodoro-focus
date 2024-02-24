import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import IndexHome from '../views/IndexHome.vue'
import IndexCountDown from '../views/IndexCountDown.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'home',
    component: IndexHome
  },
  {
    path: '/count',
    name: 'IndexCountDown',
    component: IndexCountDown
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
