<template>
  <nav class="navbar">
    <img src="../../assets/logo/logo.png" width="450px" />
    <div class="login-wrapper">
      <button class="login-button" @click="navigateToRegistration">
        USER LOGIN
      </button>
      <button class="login-button">BUSINESS LOGIN</button>
    </div>
  </nav>
</template>

<script>
import { defineComponent } from 'vue'
import { useRouter } from 'vue-router'

export default defineComponent({
  name: 'NavBar',
  setup() {
    const router = useRouter()

    const navigateToRegistration = () => {
      router.push('/login/user')
    }

    return { navigateToRegistration }
  },
})
</script>

<style scoped>
@import './style.css';
</style>
