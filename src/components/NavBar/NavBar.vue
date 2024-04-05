<template>
  <nav class="navbar">
    <img src="../../assets/logo/logo.png" width="300px" />
    <img src="../../assets/logo/logo-side.png" width="45px" />
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
import { defineComponent } from 'vue'
import { useRouter } from 'vue-router'
import styles from './style.css'

export default defineComponent({
  name: 'NavBar',
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
