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
          <v-form @submit.prevent="setData()">
            <v-card
              class="mx-auto pa-12 pb-8"
              elevation="8"
              width="400"
              height="400"
              rounded="lg"
            >
              <div class="text-h6 mb-6">Update Details</div>
              <div class="text-subtitle-1 text-medium-emphasis">Address</div>
              <v-text-field
                v-model="address"
                type="text"
                :rules="[rule]"
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
                v-model="postal"
                type="number"
                :rules="[rule]"
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
                type="submit"
                :disabled="isSubmitDisabled"
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
import { db, auth } from '/src/firebaseConfig.js'

export default {
  name: 'UpdateUserAD',
  data() {
    return {
      address: '',
      postal: '',
      isSubmitDisabled: true,
    }
  },
  computed: {
    isSubmitDisabled() {
      return !(this.address && this.postal)
    },
  },
  methods: {
    rule(value) {
      return value != false || 'Field is required'
    },
    async setData() {
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
