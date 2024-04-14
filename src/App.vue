<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
import LandingPage from './views/Landing/LandingPage.vue'
import UserLoginPage from './views/Auth/Login/UserLoginPage.vue'
import BusinessLoginPage from './views/Auth/Login/BusinessLoginPage.vue'
import BusinessRegistrationPage from './views/Auth/Registration/BusinessRegistrationPage.vue'
import UserRegistrationPage from './views/Auth/Registration/UserRegistrationPage.vue'
import UserProfilePage from './views/Profile/UserProfilePage.vue'
import UpdateUserAD from './views/Profile/UpdateUserAD.vue'
//import AddItemsPage from './views/AddItems/AddItemsPage.vue'

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
    //AddItemsPage,
  },
}
</script>
