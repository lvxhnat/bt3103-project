<template>
  <div class="login-container">
    <NavBar />
    <div class="login-form">
      <div class="left-panel">
        <div class="login-page-wrapper">
          <img src="../../../assets/auth/user_topimg.png" width="100px" />
          <h1 class="login-title">USER LOGIN</h1>
          <div class="input-wrapper">
            <form @submit.prevent="login">
              <div class="input-group">
                <label class="label">Email</label>
                <input
                  type="email"
                  id="email"
                  v-model="user.email"
                  placeholder="Enter Email"
                  required
                />
              </div>
              <div class="input-group">
                <label class="label">Password</label>
                <input
                  type="password"
                  id="password"
                  v-model="user.password"
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
      <div class="right-panel">
        <img src="../../../assets/auth/user_login.png" />
      </div>
    </div>
  </div>
</template>

<script>
import NavBar from '@/components/NavBar'

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
  },
}
</script>

<style scoped>
input {
  height: 40px;
  border-radius: 10px;
  padding-left: 10px;
}

.form-button {
  width: 100%;
  display: flex;
  align-items: center;
  justify-items: center;
  flex-direction: column;
}

.login-container {
  width: 100%; /* Corrected: Removed quotes */
}

.login-form {
  padding: 50px;
  display: flex; /* Corrected: Removed quotes */
  flex-direction: row; /* Corrected: Removed quotes */
  width: 100%; /* Corrected: Removed quotes */
}

.login-page-wrapper,
.left-panel,
.right-panel {
  height: 100%;
  display: flex;
  flex-direction: column; /* Ensures content in panels is aligned vertically */
  justify-content: center; /* Center content vertically */
  align-items: center;
}

.left-panel {
  width: 40%; /* Corrected: Removed quotes */
}

.right-panel {
  width: 60%; /* Corrected: Removed quotes */
  align-items: center; /* Center content horizontally if needed */
}

.login-page-wrapper,
.input-wrapper {
  width: 100%;
  min-width: 100%;
  height: 100%;
  min-height: 400px;
  border-radius: 40px;
  border-top: 1px solid black;
  background-color: #f8f4ed;
}

.login-page-wrapper {
  width: 100%;
  padding-top: 15px;
  background-color: #118951;
  border: 1px solid black;
}

.input-wrapper {
  width: 100%;
  padding: 50px;
}

.input-group {
  margin-bottom: 1em;
}

.input-group input {
  width: 100%;
}

.signup-link {
  color: black;
  text-align: center;
  padding-top: 50px;
}

.label {
  font-size: 20px;
  font-weight: bold;
  color: #118951;
}

.login-title {
  color: #f8f4ed;
}

.login-button {
  background-color: #118951;
  width: 150px;
}
</style>