<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
import LandingPage from './views/Landing/LandingPage.vue'
import CataloguePage from './views/Catalogue/CataloguePage.vue'
import UserLoginPage from './views/Auth/Login/UserLoginPage.vue'
import BusinessLoginPage from './views/Auth/Login/BusinessLoginPage.vue'
import BusinessRegistrationPage from './views/Auth/Registration/BusinessRegistrationPage.vue'
import UserRegistrationPage from './views/Auth/Registration/UserRegistrationPage.vue'
import UserProfilePage from './views/Profile/UserProfilePage.vue'
import UpdateUserAD from './views/Profile/UpdateUserAD.vue'
import AddItemsPage from './views/AddItems/AddItemsPage.vue'
import BusinessProfilePage from './views/Profile/BusinessProfilePage.vue'
import UpdateBusiAD from './views/Profile/UpdateBusiAD.vue'

export default {
  name: 'App',
  components: {
    LandingPage,
    UserLoginPage,
    UserRegistrationPage,
    BusinessLoginPage,
    BusinessRegistrationPage,
    UserProfilePage,
    UpdateUserAD,
    AddItemsPage,
    BusinessProfilePage,
    UpdateBusiAD,
    CataloguePage,
  },
}
</script>
