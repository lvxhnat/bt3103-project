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
          Don’t have an account? <button @click = "navigatetoBusReg">Sign up now!</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import NavBar from '@/components/NavBar'
import AuthInputBox from '@/components/AuthInputBox'
import { useRouter } from 'vue-router';


export default {
  name: 'BusinessLoginPage',
  setup() {
    const router = useRouter();

    const navigatetoBusReg = () => {
      router.push('/register/business')
    }

    return {navigatetoBusReg}
  },
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
