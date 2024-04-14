<template>
    <nav class="navbar">
      <img src="../../assets/logo/logo.png" width="450px" />
      <div class="login-wrapper">
        <img src="../../assets/logo/userlogo.png" width = "100px"/>
        <a class="navbar-login-button" @click="navigateToUserProfile">
          USER
        </a>
        <button class="navbar-login-button" @click="navigateToUserHome">
          HOME
        </button>
        <button class="navbar-login-button" @click="navigateToLandingPage">
          LOG OUT
        </button>
      </div>
    </nav>
  </template>
  
  <script>
  import { defineComponent } from 'vue'
  import { useRouter } from 'vue-router'
  import styles from './style.css'
  
  export default defineComponent({
    name: 'UserLanding',
    setup() {
      const router = useRouter()
      
      const navigateToUserProfile = () => {
        router.push('/user/profile')
      }

      const navigateToUserHome = () => {
        router.push('/login/user')
      }
      const navigateToLandingPage = () => {
        router.push('/')
      }
  
      return { navigateToUserHome, navigateToLandingPage }
    },
  })
  </script>
  