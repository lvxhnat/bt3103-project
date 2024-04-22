<template>
    <NavBar />
    <v-app>
      <div class="main-container">
        <v-content>
          <v-container fluid class="pt-8 ma-2">
            <v-row>
            <v-col cols="6" class="d-flext justify-center">
                <v-card style="height: 450px; width: 500px; margin-top: 30px; margin-right: 20px;">
                    <div class="mycart-details">
                        <v-card-title class="title"> My Cart </v-card-title>
                        <CurrentListings :items="items"/>

                  <!--
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
                  -->
                </div>
            </v-card>
            </v-col>
  
            <v-col cols="6" class="d-flex justify-center">
                <v-card style="height: 450px; width: 500px; margin-top: 30px; margin-left: 20px;">
                <div class="myaddress-details">
                    <v-card-title class="title">Delivery Address</v-card-title>

                    <div class="input-container">
                        <label class="address-input checkbox-label">
                            <input type="checkbox" class="checkbox" v-model="useProfileAddress" @change="clearNewAddressFields">
                            <span> Use Address from Profile </span>
                        </label>
                    </div>
  
                    <div class="input-container" v-if="useProfileAddress">
                        <h3 class="address-input">Address:</h3>
                        <input class="input-line" :value="profileAddress" readonly/> 
                        <br><br>
                        <h3 class="address-input">Postal Code:</h3>
                        <input class="input-line" :value="profilePostal" readonly/>
                    </div>

                    <div class="input-container" v-if="!useProfileAddress">
                        <h3 class="address-input">New Address:</h3>
                        <input class="input-line" v-model="newAddress"/>
                        <br><br>
                        <h3 class="address-input">New Postal Code:</h3>
                        <input class="input-line" v-model="newPostal"/>
                    </div> <br>
  
                    <div class="buttons">
                        <button class="save" v-if="!useProfileAddress" @click="saveAddress">Save as Default Address</button>
                        <button class="checkout">Checkout</button>
                    </div>

                </div>
                </v-card>
              </v-col>
            </v-row>
          </v-container>
        </v-content>
      </div>
    </v-app>
  </template>
    
  <script>
  import NavBar from '@/components/NavBar'
  import CartListings from '@/components/CartListings'
  import { db } from '@/firebaseConfig'
  import { doc, getDoc, updateDoc } from 'firebase/firestore'
  import { getAuth, onAuthStateChanged } from 'firebase/auth'
    
  export default {
    name: 'UserCartPage',
    components: {
        NavBar,
        CartListings,
    },
    
    data() {
        return {
            useProfileAddress: true,
            profileAddress: '',
            profilePostal: '',
            newAddress: '',
            newPostal: '',
            items: [],
        }
      },
      async mounted() {
        const auth = getAuth()
        onAuthStateChanged(auth, async (user) => {
            if (user) {
                this.useremail = user.email
                await this.fetchAndUpdateData(this.useremail)
            } else { // Redirect to home page
                this.$router.push('/')
            }
        })
    },

    methods: {
        async fetchAndUpdateData(useremail) {
            try {
                const querySnapShot = await getDoc(doc(db, 'Account Details', useremail))
                const data = querySnapShot.data()
                this.profileAddress = data.address
                this.profilePostal = data.postal
            } catch (error) {
                const errorMessage = error.message
                alert(errorMessage)
            }
        },

        async saveAddress() {
            try {
                const useremail = this.useremail
                await updateDoc(doc(db, 'Account Details', useremail), {
                    address: this.newAddress,
                    postal: this.newPostal,
                })
                alert('Address updated successfully!')
                this.profileAddress = this.newAddress
                this.profilePostal = this.newPostal
            } catch (error) {
                const errorMessage = error.message
                alert(errorMessage)
            }
        },

        clearNewAddressFields() {
            if (!this.useProfileAddress) {
                this.newAddress = ''
                this.newPostal = ''
            }
        },
    }
}
</script>
    
<style scoped>
@import './style.css';
</style>