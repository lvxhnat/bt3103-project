<template>
  <NavBar />
  <div class="main-container">
    <v-container fluid class="pa-4 ma-3">
      <v-row>
        <v-col cols="6" class="d-flex justify-center">
          <div class="account-details-container">
            <BusinessAccountDetails />
          </div>
        </v-col>
        <v-col cols="6" class="d-flex justify-center">
          <v-row class="right-container">
            <div class="current-listings-container">
              <div class="text-h6 mb-4">Current Listings</div>
              <div class="table-container">
                <table>
                  <thead>
                    <tr>
                      <th>Item</th>
                      <th>Quantity</th>
                      <th>Options</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="item in items" :key="item.id">
                      <td>
                        <div>{{ item.name }}</div>
                        <div>(ID {{ item.id }})</div>
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
                        <button
                          class="remove-button"
                          @click="removeItem(item.id)"
                        >
                          Remove Item
                        </button>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div class="table-bottom">
                <button class="add-button" @click="navitoAddItems">
                  Add Items
                </button>
                <button class="add-button">Checkout</button>
              </div>
            </div>
            <div class="wallet">
              <div class="text-h6 mb-4">Wallet</div>
              <div class="balance-container">
                <div class="text-subtitle-1 text-medium-emphasis">Balance</div>
                <v-text-field
                  placeholder="No data as of now"
                  density="compact"
                  prepend-inner-icon="mdi-account-cash-outline"
                  variant="outlined"
                  readonly
                ></v-text-field>
                <button class="top-up-button" @click="naviToWallet">
                  Top-up
                </button>
              </div>
            </div>
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

export default {
  name: 'BusinessProfilePage',
  data() {
    return {
      items: [
        { id: 'XXX', name: 'Bread', quantity: 10 },
        { id: 'XYZ', name: 'Potato', quantity: 7 },
      ],
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
