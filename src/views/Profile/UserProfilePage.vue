<template>
  <NavBar />
  <v-app>
    <div class="main-container">
      <v-container fluid class="pa-5 ma-2">
        <v-row>
          <v-col cols="6" class="d-flex justify-center">
            <div class="account-details-container">
              <UserAccountDetails />
            </div>
          </v-col>

          <v-col cols="6" class="d-flex justify-center">
            <v-row class="right-container">
              <div class="current-listings-container">
                <div class="text-h6 mb-4">Current Listings</div>
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
                <div class="text-h6 mb-4">Wallet</div>
                <div class="balance-container">
                  <div class="text-subtitle-1 text-medium-emphasis">
                    Balance
                  </div>
                  <v-text-field
                    placeholder="No data as of now"
                    density="compact"
                    prepend-inner-icon="mdi-account-cash-outline"
                    variant="outlined"
                    readonly
                  ></v-text-field>
                  <button class="top-up-button">Top-up</button>
                </div>
              </div>
            </v-row>
          </v-col>
        </v-row>
      </v-container>
    </div>
  </v-app>
</template>

<script>
import NavBar from '@/components/NavBar'
import UserAccountDetails from '../../components/AccountDetails/UserAccountDetails.vue'
import { useRouter } from 'vue-router'

export default {
  name: 'UserProfilePage',
  components: {
    NavBar,
    UserAccountDetails,
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

<style scoped>
@import './style.css';
</style>
../../components/AccountDetails/UserAccountDetails.vue