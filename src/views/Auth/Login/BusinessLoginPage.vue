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
                    v-model="email"
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
                    v-model="password"
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
                    @click="login"
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
import { auth, db } from '@/firebaseConfig'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { collection, getDocs, query, where } from 'firebase/firestore'

export default {
  name: 'BusinessLoginPage',
  setup() {
    const router = useRouter()

    const navigatetoBusReg = () => {
      router.push('/register/business')
    }

    return { navigatetoBusReg }
  },
  data() {
    return {
      email: '',
      password: '',
    }
  },
  methods: {
    async login() {
      try {
        // Check if the email exists in the users collection
        const userQuery = query(
          collection(db, 'users'),
          where('email', '==', this.email)
        )
        const userSnapshot = await getDocs(userQuery)

        // Check if the email exists in the businesses collection
        const businessQuery = query(
          collection(db, 'businesses'),
          where('email', '==', this.email)
        )
        const businessSnapshot = await getDocs(businessQuery)

        if (!businessSnapshot.empty) {
          const userCredential = await signInWithEmailAndPassword(
            auth,
            this.email,
            this.password
          )
          const user = userCredential.user
          alert('Successfully logged in as business!')
          this.$router.push({ path: '/' })
        } else if (!userSnapshot.empty) {
          alert(
            'You have a user account. Please login through the user login page.'
          )
          this.$router.push({ path: '/login/user' })
        } else {
          alert('No account found with this email.')
        }
      } catch (error) {
        console.error('Login error:', error.code)
        alert(error.message)
        //alert('An error occurred while logging in.')
      }
    },
  },
  components: {
    NavBar,
    AuthInputBox,
  },
}
</script>
