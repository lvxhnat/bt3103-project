<template>
  <div class="registration-container">
    <NavBar />
    <img
      src="../../../assets/auth/registration_floret_1.png"
      class="img-flore-1"
    />
    <img
      src="../../../assets/auth/registration_floret_2.png"
      class="img-flore-2"
    />
    <div class="authinput-wrapper">
      <AuthInputBox
        imageURL="user_topimg.png"
        title="USER REGISTRATION"
        buttonText="Register"
      />
    </div>
  </div>
</template>

<script>
import { ref } from 'vue'
import style from './style.css'
import NavBar from '@/components/NavBar'
import AuthInputBox from '@/components/AuthInputBox'

import { createUserWithEmailAndPassword } from 'firebase/auth'
import { auth } from '@/firebaseConfig'

export default {
  name: 'UserRegistrationPage',
  setup() {
    const email = ref('')
    const password = ref('')
    const error = ref(null)
    const register = async () => {
      try {
        const userCredential = await createUserWithEmailAndPassword(
          auth,
          email.value,
          password.value
        )
        console.log('Registration successful!', userCredential)
      } catch (err) {
        console.error(err)
        error.value = err.message
      }
    }
    return {
      email,
      password,
      error,
      register,
    }
  },
  components: {
    NavBar,
    AuthInputBox,
  },
}
</script>
