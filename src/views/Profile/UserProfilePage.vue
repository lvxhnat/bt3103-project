<template>
  <NavBar />
  <div class="main-container">
    <v-container fluid class="pt-6 ma-2">
      <v-row>
        <v-col cols="6" class="d-flex justify-center">
          <UserAccountDetails />
        </v-col>
        <v-col cols="6" class="d-flex justify-center">
          <v-row class="right-container">
            <v-card class="mb-4">
              <v-card-title>My Cart</v-card-title>
              <v-card-item class="pb-4 pl-4 pr-4">
                <div class="user-table-container">
                  <CartListings :items="items" @total-price-updated="updateTotalFee"/>
                </div>
              </v-card-item>
              <v-card-actions>
                <v-btn @click="navitoAddItems">Add Items</v-btn>
                <v-btn @click="navitoCartPage">Checkout</v-btn>
              </v-card-actions>
            </v-card>

            <v-card tonal color="#118951">
              <v-card-title>E-wallet Balance</v-card-title>
              <v-card-subtitle>Balance</v-card-subtitle>
              <v-card-item>
                <div>
                  <div class="text-h6 mb-1">S${{ balance }}</div>
                </div>
              </v-card-item>
              <v-card-actions>
                <v-btn @click="naviToWallet">Top-up</v-btn>
              </v-card-actions>
            </v-card>
          </v-row>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import NavBar from '@/components/NavBar'
import UserAccountDetails from '../../components/AccountDetails/UserAccountDetails.vue'
import CartListings from '@/components/CartListings'
import { useRouter } from 'vue-router'
import { db } from '@/firebaseConfig'
import { doc, getDoc, updateDoc } from 'firebase/firestore'
import { getAuth, onAuthStateChanged } from 'firebase/auth'

export default {
  name: 'UserProfilePage',
  data() {
    return {
      balance: 0,
      useremail: '',
      items: [],
    }
  },
  mounted() {
    const auth = getAuth()
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        this.useremail = user.email
        console.log(this.useremail)
        await this.fetchAndUpdateData(this.useremail)
      } else {
        // Redirect to home page
        this.$router.push('/')
      }
    })
  },
  methods: {
    increment(item) {
      item.quantity++
    },
    decrement(item) {
      if (item.quantity > 0) {
        item.quantity--
      }
    },
    removeItem(itemId) {
      this.items = this.items.filter((item) => item.id !== itemId)
    },
    async fetchAndUpdateData(useremail) {
      try {
        const querySnapShot = await getDoc(doc(db, 'Top Up', useremail))
        const data = querySnapShot.data()
        this.balance = data.balance
      } catch (error) {
        // const errorCode = error.code
        const errorMessage = error.message
        alert(errorMessage)
      }
    },
  },
  components: {
    NavBar,
    UserAccountDetails,
    CartListings,
  },
  setup() {
    const router = useRouter()

    const naviToWallet = () => {
      router.push('/topup/user')
    }

    const navitoCartPage = () => {
      router.push('/cartpage/user')
    }

    const navitoAddItems = () => {
      router.push('/')
    }

    return { naviToWallet, navitoCartPage, navitoAddItems }
  },
}
</script>

<style scoped>
@import './style.css';
</style>
