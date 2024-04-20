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

export default {
  name: 'App',
  components: {
    LandingPage,
    UserLoginPage,
    BusinessLoginPage,
    BusinessRegistrationPage,
    CataloguePage,
  },
}
</script>
