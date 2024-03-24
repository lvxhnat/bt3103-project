<template>
  <NavBar />
  <v-app>
    <div class="registration-container">
      <v-content>
        <v-container fluid class="pa-16 ma-5">
          <img
            src="../../../assets/auth/registration_floret_1.png"
            class="img-flore-1"
          />
          <img
            src="../../../assets/auth/registration_floret_2.png"
            class="img-flore-2"
          />
          <v-form @submit.prevent="register">
            <v-card
              class="mx-auto pa-12 pb-8"
              elevation="8"
              width="400"
              height="450"
              rounded="lg"
            >
              <div class="text-h6 mb-6">Business Registration</div>
              <div class="text-subtitle-1 text-medium-emphasis">Email</div>
              <v-text-field
                v-model="email"
                id="email"
                type="email"
                density="compact"
                placeholder="Email Address"
                prepend-inner-icon="mdi-email-outline"
                variant="outlined"
              ></v-text-field>
              <div
                class="text-subtitle-1 text-medium-emphasis d-flex align-center justify-space-between"
              >
                Password
              </div>
              <v-text-field
                v-model="password"
                id="password"
                :append-inner-icon="visible ? 'mdi-eye-off' : 'mdi-eye'"
                :type="visible ? 'text' : 'password'"
                density="compact"
                placeholder="Enter your password"
                prepend-inner-icon="mdi-lock-outline"
                variant="outlined"
                @click:append-inner="visible = !visible"
              ></v-text-field>
              <v-btn
                block
                class="mb-8"
                color="#118951"
                size="large"
                variant="tonal"
                >Register</v-btn
              >
            </v-card>
          </v-form>
        </v-container>
      </v-content>
    </div>
  </v-app>
</template>

<script>
import { ref } from 'vue'
import style from './style.css'
import NavBar from '@/components/NavBar'
import AuthInputBox from '@/components/AuthInputBox'

import { createUserWithEmailAndPassword } from 'firebase/auth'
import { auth } from '@/firebaseConfig'

export default {
  name: 'BusinessRegistrationPage',
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
