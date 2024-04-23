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
              height="auto"
              rounded="lg"
            >
              <div class="text-h6 mb-6">Business Account Details</div>

              <div class="text-subtitle-1 text-medium-emphasis">Store Name</div>
              <v-text-field
                v-model="store"
                id="store"
                type="text"
                density="compact"
                placeholder="Enter store name"
                prepend-inner-icon="mdi-store-outline"
                variant="outlined"
              ></v-text-field>
              <div class="text-subtitle-1 text-medium-emphasis">
                Store Address
              </div>
              <v-text-field
                v-model="address"
                id="store"
                type="text"
                density="compact"
                placeholder="Enter store address"
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
              <div class="text-subtitle-1 text-medium-emphasis">
                Store Image
              </div>
              <img id="img" src="" class="uploaded-image" />
              <v-btn class="btn btn-info" @click="onPickFile">
                Insert Store Image
              </v-btn>
              <input
                type="file"
                style="display: none"
                ref="fileInput"
                accept="image/*"
                @change="onFilePicked"
              />
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
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage'

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
            store: this.store,
            address: this.address,
            postal: this.postal,
            image: this.imageUrl,
          })

          alert('Successfully set up account details!')
          this.$router.push({ path: '/' })
        } else {
          alert('Please upload an image before setting up account details')
        }
      })
    },
    onPickFile() {
      this.$refs.fileInput.click()
    },
    async onFilePicked(event) {
      const files = event.target.files
      if (files.length > 0) {
        const storage = getStorage()
        const storageRef = ref(storage, 'store-' + this.store)
        try {
          // Upload the file to Firebase Storage
          const snapshot = await uploadBytes(storageRef, files[0])

          // Get the download URL of the uploaded file
          const downloadURL = await getDownloadURL(snapshot.ref)

          // Set the imageUrl to the download URL
          this.imageUrl = downloadURL

          // Update the <img> element to display the uploaded image
          const img = document.getElementById('img')
          img.setAttribute('src', downloadURL)
        } catch (error) {
          console.error('Error uploading image to Firebase Storage:', error)
          alert('Failed to upload image. Please try again.')
        }
      }
    },
  },
  setup() {
    const router = useRouter()

    const navigateToRegistration = () => {
      router.push('/register/business')
    }

    return { navigateToRegistration }
  },
  components: {
    AuthInputBox,
  },
}
</script>
