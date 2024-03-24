<template>
  <div class="login-container">
    <NavBar />
    <div class="login-form">
      <div class="left-panel">
        <AuthInputBox imageURL="user_topimg.png" title="USER LOGIN" />
        <div class="signup-link">
          Don’t have an account? <a href="/signup">Sign up now!</a>
        </div>
      </div>
      <div class="right-panel">
        <img src="../../../assets/auth/user_login.png" />
      </div>
    </div>
  </div>
</template>

<script>
import NavBar from '@/components/NavBar'
import AuthInputBox from '@/components/AuthInputBox/AuthInputBox.vue'
import styles from './style.css'

export default {
  name: 'UserLoginPage',
  data() {
    return {
      user: {
        email: '',
        password: '',
      },
    }
  },
  methods: {
    login() {
      // Here you would typically make an API call to your server
      console.log('Login attempt:', this.user)
      // Handle the login logic here
    },
  },
  components: {
    NavBar,
    AuthInputBox,
  },
}
</script>
