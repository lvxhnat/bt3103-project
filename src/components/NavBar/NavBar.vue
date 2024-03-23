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
import { defineComponent } from 'vue'
import { useRouter } from 'vue-router'

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

    const navigateToUserLogin = () => {
      router.push('/login/user')
    }
    const navigateToBusinessLogin = () => {
      router.push('/login/business')
    }

    return { navigateToUserLogin, navigateToBusinessLogin }
  },
})
</script>
