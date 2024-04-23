<template>
  <NavBar />
  <div class="main-container">
    <v-container fluid class="pt-6 ma-2">
      <v-row>
        <v-col cols="6" class="d-flex justify-center">
          <BusinessAccountDetails />
        </v-col>
        <v-col cols="6" class="d-flex justify-center">
          <v-row class="right-container">
            <v-card class="mb-4">
              <v-card-title>Current Listings</v-card-title>
              <v-card-item class="pb-4 pl-4 pr-4">
                <div class="business-table-container">
                  <table>
                    <thead>
                      <tr>
                        <th width="30%">Item</th>
                        <th width="30%">Price</th>
                        <th width="30%">Quantity</th>
                        <th width="10%">Options</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr v-for="item in items" :key="item.id">
                        <td>
                          <div>{{ item.name }}</div>
                        </td>
                        <td>
                          <div>S${{ item.price }}</div>
                        </td>
                        <td class="cell-increment">
                          <span>{{ item.quantity }}</span>
                          <button
                            class="increment-button"
                            @click="increment(item)"
                          >
                            +
                          </button>
                          <button
                            class="increment-button"
                            @click="decrement(item)"
                          >
                            -
                          </button>
                        </td>
                        <td>
                          <v-btn
                            class="remove-button"
                            @click="removeItem(item)"
                          >
                            Remove Item
                          </v-btn>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </v-card-item>
              <v-card-actions>
                <v-btn @click="navitoAddItems"> Add Items </v-btn>
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
import BusinessAccountDetails from '../../components/AccountDetails/BusinessAccountDetails.vue'
import { useRouter } from 'vue-router'
import { db } from '@/firebaseConfig'
import {
  doc,
  getDoc,
  getDocs,
  collection,
  query,
  updateDoc,
  deleteDoc,
} from 'firebase/firestore'
import { getAuth, onAuthStateChanged } from 'firebase/auth'
import { auth } from '../../firebaseConfig'

export default {
  name: 'BusinessProfilePage',
  data() {
    return {
      balance: 0,
      useremail: '',
      storename: '',
      items: [],
    }
  },
  setup() {
    const router = useRouter()

    const naviToWallet = () => {
      router.push('/topup/business')
    }

    const navitoAddItems = () => {
      router.push('/business/additems')
    }

    return { naviToWallet, navitoAddItems }
  },
  mounted() {
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
    async fetchAndUpdateData(useremail) {
      try {
        // Retrieve store name from Account Details
        const docRef = doc(db, 'Account Details', useremail)
        const docSnap = await getDoc(docRef)
        const storeName = docSnap.data().store

        // Retrieve items from Firestore collection named after the store name
        const itemsCollectionRef = collection(db, storeName)
        const itemsQuery = query(itemsCollectionRef)
        const querySnapshot = await getDocs(itemsQuery)

        this.items = []

        querySnapshot.forEach((doc) => {
          const item = {
            name: doc.data().name,
            price: doc.data().price,
            quantity: doc.data().quantity,
          }
          this.items.push(item)
        })

        // Fetch wallet balance from Firestore
        const walletDocRef = doc(db, 'Top Up', useremail)
        const walletDocSnap = await getDoc(walletDocRef)
        if (walletDocSnap.exists()) {
          this.balance = walletDocSnap.data().balance
        }
      } catch (error) {
        console.error('Error fetching data:', error)
        alert('Failed to fetch data. Please try again.')
      }
    },
    async increment(item) {
      item.quantity++
      await this.updateItemInFirestore(item)
    },
    async decrement(item) {
      if (item.quantity > 0) {
        item.quantity--
        await this.updateItemInFirestore(item)
      }
    },
    async updateItemInFirestore(item) {
      onAuthStateChanged(auth, async (user) => {
        if (user) {
          this.useremail = user.email
          const docRef = await getDoc(
            doc(db, 'Account Details', this.useremail)
          )
          const myData = docRef.data()
          const currDoc = doc(db, myData.store, item.name)
          await updateDoc(currDoc, {
            quantity: item.quantity,
          })
          alert('Quantity updated!')
        }
      })
    },
    async removeItem(item) {
      onAuthStateChanged(auth, async (user) => {
        if (user) {
          this.useremail = user.email
          const docRef = await getDoc(
            doc(db, 'Account Details', this.useremail)
          )
          const myData = docRef.data()
          const currDoc = doc(db, myData.store, item.name)
          await deleteDoc(currDoc)
          alert('Item deleted!')

          this.items = this.items.filter(
            (existingItem) => existingItem.name !== item.name
          )
        }
      })
    },
    navitoAddItems() {
      this.$router.push({ path: '/business/additems' })
    },
  },
  components: {
    NavBar,
    BusinessAccountDetails,
  },
}
</script>

<style scoped>
@import './style.css';
</style>
