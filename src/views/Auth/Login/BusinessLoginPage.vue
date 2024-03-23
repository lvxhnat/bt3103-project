<template>
  <div class="login-container">
    <NavBar />
    <div class="login-form">
      <div class="left-panel">
        <img src="../../../assets/auth/business_login.png" />
      </div>
      <div class="right-panel">
        <div class="login-page-wrapper">
          <img src="../../../assets/auth/business_topimg.png" width="100px" />
          <h1 class="login-title">BUSINESS LOGIN</h1>
          <div class="input-wrapper">
            <form @submit.prevent="login">
              <div class="input-group">
                <label class="label">Email</label>
                <input
                  type="email"
                  id="email"
                  v-model="business.email"
                  placeholder="Enter Email"
                  required
                />
              </div>
              <div class="input-group">
                <label class="label">Password</label>
                <input
                  type="password"
                  id="password"
                  v-model="business.password"
                  placeholder="Enter Password"
                  required
                />
              </div>
              <div class="form-button">
                <button type="submit" class="login-button">LOGIN</button>
              </div>
            </form>
          </div>
        </div>
        <div class="signup-link">
          Don’t have an account? <a href="/signup">Sign up now!</a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import NavBar from '@/components/NavBar'
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
  },
}
</script>

<style scoped>
.right-panel {
  padding-left: 100px;
}
</style>
