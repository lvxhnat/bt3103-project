<template>
  <div class="register-container">
    <h1>Register</h1>
    <input v-model="email" type="email" placeholder="Email" />
    <input v-model="password" type="password" placeholder="Password" />
    <button @click="register">Register</button>
    <p v-if="error">{{ error }}</p>
  </div>
</template>

<script>
import { ref } from 'vue'
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth'
import app from '@/firebaseConfig'

export default {
  name: 'BusinessRegistrationPage',
  setup() {
    const email = ref('')
    const password = ref('')
    const error = ref(null)
    const auth = getAuth(app)
    const register = async () => {
      try {
        const userCredential = await createUserWithEmailAndPassword(
          auth,
          email.value,
          password.value
        )
        console.log('Registration successful!', userCredential)
      } catch (err) {
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
}
</script>

<style>
.register-container {
  display: flex;
  flex-direction: column;
  width: 300px;
  margin: auto;
}

.register-container input,
.register-container button {
  margin: 10px 0;
}
</style>
