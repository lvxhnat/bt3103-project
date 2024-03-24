<template>
  <div class="login-container">
    <NavBar />
    <div class="login-form">
      <div class="left-panel">
        <img src="../../../assets/auth/business_login.png" />
      </div>
      <div class="right-panel">
        <AuthInputBox
          imageURL="globe.png"
          title="BUSINESS LOGIN"
          buttonText="Login"
        />
        <div class="signup-link">
          Don’t have an account? <a href="/signup">Sign up now!</a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import NavBar from '@/components/NavBar'
import AuthInputBox from '@/components/AuthInputBox'
import styles from './style.css'

export default {
  name: 'BusinessLoginPage',
  data() {
    return {
      business: {
        email: '',
        password: '',
      },
    }
  },
  methods: {
    login() {
      console.log('Login attempt:', this.business)
    },
  },
  components: {
    NavBar,
    AuthInputBox,
  },
}
</script>

<style scoped>
.right-panel {
  padding-left: 100px;
}
</style>
