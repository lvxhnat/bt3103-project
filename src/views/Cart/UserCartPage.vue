<template>
  <NavBar />
  <v-app>
    <div class="main-container">
      <v-content>
        <v-container fluid class="pa-5 ma-2">
          <v-row>
            <v-col cols="6" class="d-flext justify-center">
              <div class="mycart-details">
                <h1 class="title"> My Cart </h1>
                <div class = "table">
                  <table>
                      <tr>
                      <th width="60%">Item</th>
                      <th width="10%">Quantity</th>
                      <th width="40%">Total Price</th>
                      </tr>
                  </table><br><br>
                  <h3 class="delivery">Delivery Fee:</h3>
                  <h3 class="total">Total:</h3>
                </div>
              </div>
            </v-col>

              <div class="myaddress-details">

              </div>

          </v-row>
        </v-container>
      </v-content>
    </div>
  </v-app>
</template>
  
<script>
import NavBar from '@/components/NavBar'
import { db } from '@/firebaseConfig'
import { doc, getDoc, updateDoc } from 'firebase/firestore'
import { getAuth, onAuthStateChanged } from 'firebase/auth'
  
export default {
    name: 'UserCartPage',
    components: {
      NavBar,
    },
    data() {
      return {}
    },
}
</script>
  
<style scoped>
@import './style.css';
</style>