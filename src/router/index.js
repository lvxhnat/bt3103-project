import { createRouter, createWebHistory } from 'vue-router'
import LandingPage from '../views/Landing/LandingPage.vue'
import UserLoginPage from '../views/Auth/Login/UserLoginPage.vue'
import BusinessLoginPage from '../views/Auth/Login/BusinessLoginPage.vue'
import BusinessRegistrationPage from '../views/Auth/Registration/BusinessRegistrationPage.vue'
import UserRegistrationPage from '../views/Auth/Registration/UserRegistrationPage.vue'
import TopUpPage from '../views/TopUpPage.vue'

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
  },
  {
    path: '/login/business',
    name: 'businesslogin',
    component: BusinessLoginPage
  },
  {
    path: '/register/user',
    name: 'businessuser',
    component: UserRegistrationPage
  },
  {
    path: '/register/business',
    name: 'businessregister',
    component: BusinessRegistrationPage
  },
  {
    path: '/topup',
    name: 'topup',
    component: TopUpPage
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes: routes
})

export default router
