import { createRouter, createWebHistory } from 'vue-router'
import LandingPage from '../views/Landing/LandingPage.vue'
import UserLoginPage from '../views/Auth/Login/UserLoginPage.vue'
import BusinessRegistrationPage from '../views/Auth/Registration/BusinessRegistrationPage.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: LandingPage
  },
  {
    path: '/registration',
    name: 'registration',
    component: BusinessRegistrationPage
  },
  {
    path: '/login/user',
    name: 'userlogin',
    component: UserLoginPage
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes: routes
})

export default router
