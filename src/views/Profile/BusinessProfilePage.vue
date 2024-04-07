<template>
  <NavBar />
  <v-app>
    <div class="landing-container">
      <v-content>
        <v-container fluid class="pa-3 ma-2">
          <div class="main-container">
            <div class="left-panel">
              <div class="account-details">
                <h1 class="account-details-title">Account Details</h1>
                <div class="input-container">
                  <h3 class="account-details-input">Email</h3>
                  <input class="input-acc" />
                </div>
                <div class="input-container">
                  <h3 class="account-details-input">Account Details</h3>
                  <input class="input-acc" />
                </div>
                <div class="input-container">
                  <h3 class="account-details-input">Store Name</h3>
                  <input class="input-acc" />
                </div>
                <div class="input-container">
                  <h3 class="account-details-input">Store Address</h3>
                  <input class="input-acc" />
                </div>
                <div class="input-container">
                  <h3 class="account-details-input">Postal Code</h3>
                  <input class="input-acc" />
                </div>
              </div>
            </div>
            <div class="right-panel">
              <div class="current-listings-container">
                <h1 class="account-details-title">Current Listings</h1>
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
                <div class="table-bottom">
                  <button class="add-button">Add Items</button>
                  <button class="add-button">Checkout</button>
                </div>
              </div>
              <div class="wallet">
                <h1 class="account-details-title">Wallet</h1>
                <div class="balance-container">
                  <h3 class="balance-side">Balance:</h3>
                  <input class="input-acc" />
                  <button class="top-up-button">Top-up</button>
                </div>
              </div>
            </div>
          </div>
        </v-container>
      </v-content>
    </div>
  </v-app>
</template>

<script>
import NavBar from '@/components/NavBar'

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
  },
  components: {
    NavBar,
  },
}
</script>

<style scoped>
@import './style.css';
</style>
