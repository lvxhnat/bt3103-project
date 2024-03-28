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
import UserProfilePage from './views/Profiles/UserProfilePage.vue'

export default {
  name: 'App',
  components: {
    LandingPage,
    UserLoginPage,
    UserRegistrationPage,
    BusinessLoginPage,
    BusinessRegistrationPage,
    UserProfilePage,
  },
}
</script>
