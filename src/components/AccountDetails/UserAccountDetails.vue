<template>
  <div class="account-details">
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
import { getDoc, getFirestore, doc, collection } from 'firebase/firestore'
import { getAuth, onAuthStateChanged } from 'firebase/auth'
import { db,auth } from '/src/firebaseConfig.js'
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
    onAuthStateChanged(auth,(user) => {
        if (user) {
            this.email = user.email
            this.getData()
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
