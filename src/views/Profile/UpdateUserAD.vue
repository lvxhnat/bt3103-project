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
          <v-btn variants="outlined" color="#f8f4ed" @click="naviToUserProfile">
            BACK TO PROFILE
          </v-btn>
        </template>
      </v-list>
    </v-app-bar>
  </v-app>
  <v-app>
    <div class="update-container">
      <v-content>
        <v-container fluid class="pa-16 ma-5">
          <v-form>
            <v-card
              class="mx-auto pa-12 pb-8"
              elevation="8"
              width="400"
              height="450"
              rounded="lg"
            >
              <div class="text-h6 mb-6">Update Details</div>
              <div class="text-subtitle-1 text-medium-emphasis">Address</div>
              <v-text-field
                v-model="this.address"
                id="address"
                density="compact"
                placeholder="Enter address"
                prepend-inner-icon="mdi-map-marker-outline"
                variant="outlined"
              ></v-text-field>
              <div class="text-subtitle-1 text-medium-emphasis">
                Postal Code
              </div>
              <v-text-field
                v-model="this.postal"
                id="postal"
                density="compact"
                placeholder="Enter postal code"
                prepend-inner-icon="mdi-mailbox-open-outline"
                variant="outlined"
              ></v-text-field>
              <v-btn
                block
                class="mb-8"
                color="#118951"
                size="large"
                variant="tonal"
                @click="setData(this.address, this.postal)"
                >Submit Details</v-btn
              >
            </v-card>
          </v-form>
        </v-container>
      </v-content>
    </div>
  </v-app>
</template>

<script>
import { updateDoc, doc } from 'firebase/firestore'
import { getAuth } from 'firebase/auth'
import { useRouter } from 'vue-router'
import { db } from '/src/firebaseConfig.js'

export default {
  name: 'UpdateUserAD',
  data() {
    return {
      address: '',
      postal: '',
    }
  },
  methods: {
    async setData(address, postal) {
      const auth = getAuth()
      const email = auth.currentUser.email
      await updateDoc(doc(db, 'Account Details', email), {
        address: this.address,
        postal: this.postal,
      })
      alert('Details updated!')
      this.$router.push({ path: '/profile/user' })
    },
  },
  setup() {
    const router = useRouter()

    const naviToUserProfile = () => {
      router.push('/profile/user')
    }

    return { naviToUserProfile }
  },
}
</script>

<style scoped>
@import './style.css';
</style>
