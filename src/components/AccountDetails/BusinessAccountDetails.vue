<template>
  <v-card class="details">
    <v-card-title class="mb-4">Account Details</v-card-title>

    <v-card-subtitle>Email</v-card-subtitle>
    <v-card-text class="mb-2">{{ email }}</v-card-text>

    <v-card-subtitle>Account Number</v-card-subtitle>
    <v-card-text class="mb-2">{{ accNo }}</v-card-text>

    <v-card-subtitle>Store Name</v-card-subtitle>
    <v-card-text class="mb-2">{{ store }}</v-card-text>

    <v-card-subtitle>Address</v-card-subtitle>
    <v-card-text class="mb-2">{{ address }}</v-card-text>

    <v-card-subtitle>Postal Code</v-card-subtitle>
    <v-card-text class="mb-2">{{ postal }}</v-card-text>

    <v-card-subtitle>Store Image</v-card-subtitle>
    <img id="img" src="" />
    <button class="btn btn-info" @click="onPickFile">Insert Store Image</button>
    <input
      type="file"
      style="display: none"
      ref="fileInput"
      accept="image/*"
      @change="onFilePicked"
    />

    <v-card-actions class="pl-3 pr-3">
      <v-btn
        block
        class="mb-8"
        color="#118951"
        size="large"
        variant="tonal"
        @click="naviToUpdate"
        >Update Details</v-btn
      >
    </v-card-actions>
  </v-card>
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
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        this.email = user.email
        await this.getBusiData(this.email)
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
      const imageRef = ref(storage, "store-" + this.store)
      const imgURL = await getDownloadURL(imageRef)
      this.image = imgURL
      await updateDoc(doc(db, 'Account Details', this.email), {
            image: this.image
          })
      const img = document.getElementById('img')
      img.setAttribute('src', imgURL)
    },
    onPickFile() {
      this.$refs.fileInput.click()
    },
    onFilePicked(event) {
      const files = event.target.files
      const storage = getStorage()
      const childRef = ref(storage, "store-" + this.store)
      uploadBytes(childRef, files[0]).then((snapshot) => {
        console.log('Uploaded store image!')
      })
      location.reload()
    },
  },
}
</script>

<style scoped>
@import './style.css';
</style>
