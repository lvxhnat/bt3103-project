import { createRouter, createWebHistory } from 'vue-router'
import LandingPage from '../views/Landing/LandingPage.vue'
import UserLoginPage from '../views/Auth/Login/UserLoginPage.vue'
import BusinessLoginPage from '../views/Auth/Login/BusinessLoginPage.vue'
import BusinessRegistrationPage from '../views/Auth/Registration/BusinessRegistrationPage.vue'
import UserRegistrationPage from '../views/Auth/Registration/UserRegistrationPage.vue'
import UserProfilePage from '../views/Profile/UserProfilePage.vue'
import BusinessProfilePage from '../views/Profile/BusinessProfilePage.vue'
import UpdateUserAD from '../views/Profile/UpdateUserAD.vue'
import UpdateBusiAD from '../views/Profile/UpdateBusiAD.vue'
import AddItemsPage from '../views/AddItems/AddItemsPage.vue'
import CataloguePage from '../views/Catalogue/CataloguePage.vue'
import TopUpPage from '../views/TopUp/TopUpPage.vue'
import UserCartPage from '../views/Cart/UserCartPage.vue'
import NotFoundPage from '../views/NotFound/NotFoundPage.vue'
import StorePage from '../views/Store/StorePage.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: LandingPage,
  },
  {
    path: '/login/user',
    name: 'userlogin',
    component: UserLoginPage,
  },
  {
    path: '/login/business',
    name: 'businesslogin',
    component: BusinessLoginPage,
  },
  {
    path: '/register/user',
    name: 'businessuser',
    component: UserRegistrationPage,
  },
  {
    path: '/register/business',
    name: 'businessregister',
    component: BusinessRegistrationPage,
  },
  {
    path: '/profile/user',
    name: 'userprofile',
    component: UserProfilePage,
  },
  {
    path: '/profile/user/updatead',
    name: 'updateUserAD',
    component: UpdateUserAD,
  },
  {
    path: '/profile/business/updatead',
    name: 'updateBusiAD',
    component: UpdateBusiAD,
  },
  {
    path: '/profile/business',
    name: 'businessprofile',
    component: BusinessProfilePage,
  },
  {
    path: '/catalogue',
    name: 'cataloguepage',
    component: CataloguePage,
  },
  {
    path: '/topup/user',
    name: 'usertopup',
    component: TopUpPage,
  },
  {
    path: '/topup/business',
    name: 'businesstopup',
    component: TopUpPage,
  },
  {
    path: '/cartpage/user',
    name: 'usercartpage',
    component: UserCartPage
  },
  {
    path: '/:catchAll(.*)',
    name: 'notfound',
    component: NotFoundPage,
  },
  {
    path: '/store/:id', // ':id' is the store name/id
    name: 'storepage',
    component: StorePage,
    props: true, // Allows the route parameters to be passed as props to the component
  },
  {
    path: '/business/additems',
    name: 'businessadditems',
    component: AddItemsPage,
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes: routes,
})

export default router
