<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
import LandingPage from './views/Landing/LandingPage.vue'
import UserLoginPage from './views/Auth/Login/UserLoginPage.vue'
import BusinessRegistrationPage from './views/Auth/Registration/BusinessRegistrationPage.vue'

export default {
  name: 'App',
  components: {
    LandingPage,
    UserLoginPage,
    BusinessRegistrationPage,
  },
}
</script>
