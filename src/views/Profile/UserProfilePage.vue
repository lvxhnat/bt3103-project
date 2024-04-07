<template>
  <div class="landing-container">
    <NavBar />
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
            <h3 class="account-details-input">Details</h3>
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
                  <button class="increment-button" @click="increment(item)">
                    +
                  </button>
                  <button class="increment-button" @click="decrement(item)">
                    -
                  </button>
                </td>
                <td>
                  <button class="remove-button" @click="removeItem(item.id)">
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
  </div>
</template>

<script>
import NavBar from '@/components/NavBar'

export default {
  name: 'UserProfilePage',
  components: {
    NavBar,
  },
}
</script>

<style scoped>
@import './style.css';
</style>
