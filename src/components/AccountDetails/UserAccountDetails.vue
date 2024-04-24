<template>
  <v-card class="details">
    <v-card-title class="mb-4">Account Details</v-card-title>

    <v-card-subtitle>Email</v-card-subtitle>
    <v-card-text class="mb-2">{{ email }}</v-card-text>

    <v-card-subtitle>Account Number</v-card-subtitle>
    <v-card-text class="mb-2">{{ accNo }}</v-card-text>

    <v-card-subtitle>Address</v-card-subtitle>
    <v-card-text class="mb-2">{{ address }}</v-card-text>

    <v-card-subtitle>Postal Code</v-card-subtitle>
    <v-card-text class="mb-2">{{ postal }}</v-card-text>

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
import { getDoc, getFirestore, doc, collection } from 'firebase/firestore'
import { getAuth, onAuthStateChanged } from 'firebase/auth'
import { db, auth } from '/src/firebaseConfig.js'
import { useRouter } from 'vue-router'

export default {
  name: 'UserAccountDetails',
  data() {
    return {
      email: '',
      accNo: '',
      address: '',
      postal: '',
    }
  },
  methods: {
    async getData() {
      const docRef = doc(db, 'Account Details', this.email)
      const docs = await getDoc(docRef)
      const accdet = docs.data()
      this.email = accdet.email
      this.accNo = accdet.accNo
      this.address = accdet.address
      this.postal = accdet.postal
    },
  },
  mounted() {
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        this.email = user.email
        await this.getData()
      } else {
      }
    })
  },
  setup() {
    const router = useRouter()

    const naviToUpdate = () => {
      router.push('/profile/user/updatead')
    }
    return { naviToUpdate }
  },
}
</script>

<style>
@import './style.css';
</style>
