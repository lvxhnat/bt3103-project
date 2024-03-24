<template>
  <NavBar />
  <v-app>
    <div class="login-container">
      <v-content>
        <v-container fluid class="pa-16 ma-5">
          <v-row>
            <v-col cols="6" class="d-flex justify-center">
              <img
                src="../../../assets/auth/business_login.png"
                height="450"
                width="419.25"
              />
            </v-col>
            <v-col cols="6" class="d-flex justify-center">
              <v-form @submit.prevent="login">
                <v-card
                  class="mx-auto pa-12 pb-8"
                  elevation="8"
                  width="400"
                  height="450"
                  rounded="lg"
                >
                  <div class="text-h6 mb-6">Business Login</div>
                  <div class="text-subtitle-1 text-medium-emphasis">Email</div>
                  <v-text-field
                    v-model="business.email"
                    density="compact"
                    placeholder="Email Address"
                    prepend-inner-icon="mdi-email-outline"
                    variant="outlined"
                  ></v-text-field>
                  <div
                    class="text-subtitle-1 text-medium-emphasis d-flex align-center justify-space-between"
                  >
                    Password
                    <a
                      class="text-caption text-decoration-none text-green"
                      href="#"
                      rel="noopener noreferrer"
                      target="_blank"
                      >Forgot password?</a
                    >
                  </div>
                  <v-text-field
                    v-model="business.password"
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
                    >Log In</v-btn
                  >
                  <v-card-text class="text-center">
                    <a
                      class="text-green text-decoration-none"
                      href="/register/business"
                      rel="noopener noreferrer"
                      >Sign up now
                      <v-icon icon="mdi-chevron-right"></v-icon>
                    </a>
                  </v-card-text>
                </v-card>
              </v-form>
            </v-col>
          </v-row>
        </v-container>
      </v-content>
    </div>
  </v-app>
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
