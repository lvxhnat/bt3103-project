<template>
  <NavBar />
  <v-app>
    <div class="login-container">
      <v-content>
        <v-container fluid class="pa-16 ma-5">
          <v-row>
            <!-- Left panel -->
            <v-col cols="6" class="d-flex justify-center">
              <v-form @submit.prevent="login">
                <v-card
                  class="mx-auto pa-12 pb-8"
                  elevation="8"
                  width="400"
                  height="450"
                  rounded="lg"
                >
                  <div class="text-subtitle-1 text-medium-emphasis">Email</div>
                  <v-text-field
                    v-model="user.email"
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
                    v-model="user.password"
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
                      href="/register/user"
                      rel="noopener noreferrer"
                      >Sign up now
                      <v-icon icon="mdi-chevron-right"></v-icon>
                    </a>
                  </v-card-text>
                </v-card>
              </v-form>
            </v-col>
            <v-col cols="6" class="d-flex justify-center">
              <img src="../../../assets/auth/user_login.png" height="450" />
            </v-col>
          </v-row>
        </v-container>
      </v-content>
    </div>
  </v-app>
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
