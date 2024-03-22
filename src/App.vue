<template>
  <landing-page></landing-page>
</template>

<script>
import LandingPage from './views/Landing/LandingPage.vue'
import BusinessRegistrationPage from './views/Auth/Registration/BusinessRegistrationPage.vue'

export default {
  name: 'App',
  components: {
    LandingPage,
    BusinessRegistrationPage,
  },
}
</script>
