<template>
  <div class="business-details">
    <div class="text-h6 mb-4">Account Details</div>
    <div class="text-subtitle-1 text-medium-emphasis">Email</div>
    <v-text-field
      :value="email"
      density="compact"
      prepend-inner-icon="mdi-email-outline"
      variant="outlined"
      readonly
    ></v-text-field>
    <div class="text-subtitle-1 text-medium-emphasis">Account Number</div>
    <v-text-field
      :value="accNo"
      density="compact"
      prepend-inner-icon="mdi-account-circle-outline"
      variant="outlined"
      readonly
    ></v-text-field>
    <div class="text-subtitle-1 text-medium-emphasis">Store Name</div>
    <v-text-field
      :value="store"
      density="compact"
      prepend-inner-icon="mdi-store-outline"
      variant="outlined"
      readonly
    ></v-text-field>
    <div class="text-subtitle-1 text-medium-emphasis">Address</div>
    <v-text-field
      :value="address"
      density="compact"
      prepend-inner-icon="mdi-map-marker-outline"
      variant="outlined"
      readonly
    ></v-text-field>
    <div class="text-subtitle-1 text-medium-emphasis">Postal Code</div>
    <v-text-field
      :value="postal"
      density="compact"
      prepend-inner-icon="mdi-mailbox-open-outline"
      variant="outlined"
      readonly
    ></v-text-field>
    <div class="text-subtitle-1 text-medium-emphasis">Store Image</div>
    <img id="img" />
    <button class="btn btn-info" @click="onPickFile">Insert Store Image</button>
    <input
      type="file"
      style="display: none"
      ref="fileInput"
      accept="image/*"
      @change="onFilePicked"
    />
    <v-btn
      block
      class="mb-8"
      color="#118951"
      size="large"
      variant="tonal"
      @click="naviToUpdate"
      >Update Details</v-btn
    >
  </div>
</template>

<script>
import {
  getDoc,
  getFirestore,
  doc,
  collection,
  updateDoc,
} from 'firebase/firestore'
import { getAuth, onAuthStateChanged } from 'firebase/auth'
import { db, auth } from '/src/firebaseConfig.js'
import { useRouter } from 'vue-router'
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage'

export default {
  name: 'BusinessAccountDetails',
  data() {
    return {
      email: '',
      accNo: '',
      store: '',
      address: '',
      postal: '',
      image: '',
    }
  },
  mounted() {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        this.email = user.email
        this.getBusiData(this.email)
      }
    })
  },
  setup() {
    const router = useRouter()
    const naviToUpdate = () => {
      router.push('/profile/business/updatead')
    }

    return { naviToUpdate }
  },
  methods: {
    async getBusiData(email) {
      const docRef = doc(db, 'Account Details', email)
      const docs = await getDoc(docRef)
      const accdet = docs.data()
      this.email = accdet.email
      this.accNo = accdet.accNo
      this.store = accdet.store
      this.address = accdet.address
      this.postal = accdet.postal
      const storage = getStorage()
      const imageRef = ref(storage, 'store-' + this.store)
      const imgURL = await getDownloadURL(imageRef)
      const img = document.getElementById('img')
      img.setAttribute('src', imgURL)
    },
    onPickFile() {
      this.$refs.fileInput.click()
    },
    onFilePicked(event) {
      const files = event.target.files
      const storage = getStorage()
      const storageRef = ref(storage, 'store-' + this.store)
      uploadBytes(storageRef, files).then((snapshot) => {
        console.log('Uploaded store image!')
      })
      const fileReader = new FileReader()
      fileReader.addEventListener('load', () => {
        this.image = fileReader.result
      })
      fileReader.readAsDataURL(files[0])
    },
  },
}
</script>

<style scoped>
@import './style.css';
</style>
