<template>
  <v-app>
    <v-app-bar
      style="padding: 0px 90px"
      app
      color="#F8F4ED"
      dark
      elevation="6"
      elevate-on-scroll
    >
      <v-app-bar-title style="color: #118951">SECONDSERVINGS</v-app-bar-title>

      <v-spacer></v-spacer>

      <v-list class="d-flex align center" style="background-color: #f8f4ed">
        <!-- <v-list-item
          link
          rounded
          v-for="menu in menus"
          :key="menu.title"
          :to="menu.route"
          style="background-color: #f8f4ed"
        >
          <v-list-item-title style="color: black"
            >{{ menu.title }}
          </v-list-item-title>
        </v-list-item> -->
        <v-btn variants="outlined" color="#118951" @click="navigateToUserLogin">
          USER LOGIN
        </v-btn>
        <v-btn outlined color="#118951" @click="navigateToBusinessLogin">
          BUSINESS LOGIN
        </v-btn>
      </v-list>
    </v-app-bar>
  </v-app>
</template>

<script>
import styles from './style.css'
import { defineComponent, computed } from 'vue'
import { useRouter, useRoute } from 'vue-router'

export default defineComponent({
  name: 'NavBar',
  /*data() {
    return {
      menus: [
        { title: 'Home', route: '/' },
        { title: 'About Us', route: '/About/Us' },
      ],
    }
  },*/
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
