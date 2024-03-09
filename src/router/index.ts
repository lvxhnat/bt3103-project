import { createRouter, createWebHistory } from 'vue-router'
import LoginPage from '@/views/LoginPage'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: LoginPage
    },
  ]
})

export default router
