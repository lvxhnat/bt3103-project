<template>
  <nav class="navbar">
    <!-- Use computed properties for image sources -->
    <img
      v-if="
        route.path !== '/profile/user' && route.path !== '/profile/business'
      "
      :src="logoImage"
      width="300px"
      @click="navigateHome"
      class="clickable-image"
    />
    <img
      :src="logoSideImage"
      width="45px"
      @click="navigateHome"
      class="clickable-image"
    />
    <span v-if="route.path === '/profile/user'" class="profile-text"
      >User Profile</span
    >
    <span v-if="route.path === '/profile/business'" class="profile-text"
      >Business Profile</span
    >
    <div class="login-wrapper">
      <button class="navbar-login-button" @click="navigateToUserLogin">
        USER LOGIN
      </button>
      <button class="navbar-login-button" @click="navigateToBusinessLogin">
        BUSINESS LOGIN
      </button>
    </div>
  </nav>
</template>

<script>
import styles from './style.css'
import { defineComponent, computed } from 'vue'
import { useRouter, useRoute } from 'vue-router'

export default defineComponent({
  name: 'NavBar',
  setup() {
    const router = useRouter()
    const route = useRoute()

    const navigateToUserLogin = () => {
      router.push('/login/user')
    }
    const navigateToBusinessLogin = () => {
      router.push('/login/business')
    }

    const navigateHome = () => {
      router.push('/')
    }

    // Computed properties for image sources
    const logoImage = computed(() => {
      return route.path === '/profile/user' ||
        route.path === '/profile/business'
        ? require('../../assets/logo/profile.png')
        : require('../../assets/logo/logo.png')
    })
    const logoSideImage = computed(() => {
      // Assuming you want to change both images, otherwise adjust as needed
      return route.path === '/profile/user' ||
        route.path === '/profile/business'
        ? require('../../assets/logo/profile.png')
        : require('../../assets/logo/logo-side.png')
    })

    return {
      navigateHome,
      navigateToUserLogin,
      navigateToBusinessLogin,
      logoImage,
      logoSideImage,
      route,
    }
  },
})
</script>
