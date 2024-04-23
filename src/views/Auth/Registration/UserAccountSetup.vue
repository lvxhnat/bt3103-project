<template>
  <v-app>
    <v-app-bar
      style="padding: 0px 90px"
      app
      color="#118951"
      dark
      elevation="6"
      elevate-on-scroll
    >
      <router-link to="/" style="text-decoration: none; color: inherit">
        <v-app-bar-title style="color: #f8f4ed">SECONDSERVINGS</v-app-bar-title>
      </router-link>

      <v-spacer></v-spacer>

      <v-list class="d-flex align center" style="background-color: #118951">
        <template v-if="!user">
          <v-btn
            variants="outlined"
            color="#f8f4ed"
            @click="navigateToRegistration"
          >
            BACK TO REGISTRATION
          </v-btn>
        </template>
      </v-list>
    </v-app-bar>
  </v-app>
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
          <v-form @submit.prevent="registerAccountDetails">
            <v-card
              class="mx-auto pa-12 pb-8"
              elevation="8"
              width="400"
              height="400"
              rounded="lg"
            >
              <div class="text-h6 mb-6">User Account Details</div>

              <div class="text-subtitle-1 text-medium-emphasis">Address</div>
              <v-text-field
                v-model="address"
                id="store"
                type="text"
                density="compact"
                placeholder="Enter address"
                prepend-inner-icon="mdi-map-marker-outline"
                variant="outlined"
              ></v-text-field>
              <div class="text-subtitle-1 text-medium-emphasis">
                Postal Code
              </div>
              <v-text-field
                v-model="postal"
                id="postal"
                type="number"
                density="compact"
                placeholder="Enter postal code"
                prepend-inner-icon="mdi-mailbox-open-outline"
                variant="outlined"
              ></v-text-field>
              <div class="setup-btn">
                <v-btn
                  block
                  class="mb-8"
                  color="#118951"
                  size="large"
                  variant="tonal"
                  @click="registerAccountDetails"
                  >Setup account</v-btn
                >
              </div>
            </v-card>
          </v-form>
        </v-container>
      </v-content>
    </div>
  </v-app>
</template>

<script>
import style from './style.css'
import AuthInputBox from '@/components/AuthInputBox'
import { onAuthStateChanged } from 'firebase/auth'
import { collection, updateDoc, doc } from 'firebase/firestore'
import { auth, db } from '@/firebaseConfig'
import { useRouter } from 'vue-router'

export default {
  name: 'BusinessRegistrationPage',
  data() {
    return {
      store: '',
      address: '',
      postal: '',
      image: '',
    }
  },
  methods: {
    async registerAccountDetails() {
      onAuthStateChanged(auth, async (user) => {
        if (user) {
          this.email = user.email
          const currentDoc = doc(db, 'Account Details', this.email)
          await updateDoc(currentDoc, {
            address: this.address,
            postal: this.postal,
          })
          alert('Successfully set up account details!')
          this.$router.push({ path: '/' })
        }
      })
    },
  },
  setup() {
    const router = useRouter()

    const navigateToRegistration = () => {
      router.push('/register/user')
    }

    return { navigateToRegistration }
  },
  components: {
    AuthInputBox,
  },
}
</script>
