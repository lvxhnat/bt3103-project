<template>
  <div class="login-container">
    <NavBar />
    <div class="login-form">
      <div class="left-panel">
        <AuthInputBox
          imageURL="user_topimg.png"
          title="USER LOGIN"
          buttonText="Login"
        />
        <div class="signup-link">
          Don’t have an account? <button @click = 'navigatetoUserReg'>Sign up now!</button>
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
import { useRouter } from 'vue-router';

export default {
  name: 'UserLoginPage',
  setup() {
    const router = useRouter();

    const navigatetoUserReg = () => {
      router.push('/register/user')
    }

    return {navigatetoUserReg}
  },
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

<style scoped>
@import './style.css';
</style>