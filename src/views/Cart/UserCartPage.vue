<template>
    <NavBar />
    <v-app>
        <div class="main-container">
            <v-container fluid class="pt-8 ma-2">
                <v-row>
                    <v-col cols="6" class="d-flext justify-center">
                        <v-card style="height: 450px; width: 700px; margin-top: 30px; margin-right: 40px">
                            <div class="mycart-details">
                                <v-card-title class="title"> My Cart </v-card-title>
                                <CartListings :items="items" @total-price-updated="updateTotalFee" />
                            </div>

                            <div class="otherFees">
                                <span class="deliveryFee">Delivery Fee: $2</span><br>
                                <span class="totalFee">Total Fee: ${{ totalFee }}</span>
                            </div>
                        </v-card>
                    </v-col>

                    <v-col cols="6" class="d-flex justify-center">
                        <v-card style="height: 450px; width: 500px; margin-top: 30px; margin-left: 40px;">
                            <div class="myaddress-details">
                                <v-card-title class="title">Delivery Address</v-card-title>

                                <div class="input-container">
                                    <label class="address-input checkbox-label">
                                        <input type="checkbox" class="checkbox" v-model="useProfileAddress"
                                            @change="clearNewAddressFields">
                                        <span> Use Address from Profile </span>
                                    </label>
                                </div>

                                <div class="input-container" v-if="useProfileAddress">
                                    <span class="input-title">Address:</span>
                                    <input class="input-line" :value="profileAddress" readonly />
                                    <br><br>
                                    <span class="input-title">Postal Code:</span>
                                    <input class="input-line" :value="profilePostal" readonly />
                                </div>

                                <div class="input-container" v-if="!useProfileAddress">
                                    <span class="input-title">New Address:</span>
                                    <input class="input-line" v-model="newAddress" />
                                    <br><br>
                                    <span class="input-title">New Postal Code:</span>
                                    <input class="input-line" v-model="newPostal" />
                                </div> <br>

                                <div class="buttons">
                                    <v-btn class="save" v-if="!useProfileAddress" @click="saveAddress">Save as Default
                                        Address</v-btn>
                                    <v-btn class="checkout" @click="checkout">Checkout</v-btn>
                                </div>

                            </div>
                        </v-card>
                    </v-col>
                </v-row>
            </v-container>
        </div>
    </v-app>
</template>

<script>
import NavBar from '@/components/NavBar'
import CartListings from '@/components/CartListings'
import { db } from '@/firebaseConfig'
import { doc, getDoc, getDocs, updateDoc, deleteDoc, collection, query, where } from 'firebase/firestore'
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
            deliveryFee: 2,
            totalFee: 0,
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
        updateTotalFee(totalPrice) {
            this.totalFee = totalPrice + this.deliveryFee;
        },

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

        async clearUserCart(useremail) {
            try {
                const cartRef = collection(db, useremail);
                const querySnapshot = await getDocs(cartRef);
                const batch = [];
                querySnapshot.forEach((doc) => {
                    batch.push(deleteDoc(doc.ref));
                });
                await Promise.all(batch);
            } catch (error) {
                const errorMessage = error.message;
                alert(errorMessage);
            }
        },

        async checkout() {
            try {
                const totalFee = this.totalFee;
                const useremail = this.useremail;
                const querySnapShot = await getDoc(doc(db, 'Top Up', useremail));
                const data = querySnapShot.data();
                const balance = data.balance;
                const transactions = data.transactions;

                // Check if the balance is sufficient for the total fee
                if (balance >= totalFee) {
                    const newBalance = balance - totalFee;
                    let dateTime = new Date();
                    const date = dateTime.toLocaleString('en-UK', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                    });
                    const time = dateTime.toLocaleTimeString();
                    dateTime = date + ', ' + time;
                    let newTransactions = [...transactions]
                    newTransactions.push({ timestamp: dateTime, amount: -totalFee })

                    await updateDoc(doc(db, 'Top Up', useremail), {
                        balance: newBalance,
                        transactions: newTransactions,
                    });

                    const cartRef = collection(db, useremail)
                    const snapShot = await getDocs(cartRef)

                    for (const items of snapShot.docs) {
                        const item = items.data();
                        const storeName = item.store;
                        const itemName = item.name;
                        const price = item.price;
                        const quantity = item.quantity;
                        console.log(storeName)
                        console.log(itemName)
                        console.log(price)
                        console.log(quantity)

                        // Update business Top-up
                        const businessQuery = query(collection(db, 'Account Details'), where('store', '==', storeName));
                        const businessSnapshot = await getDocs(businessQuery);
                        const businessData = businessSnapshot.docs[0].data();
                        const storeemail = businessData.email;
                        const businessTopupSnapshot = await getDoc(doc(db, 'Top Up', storeemail));
                        const businessTopupData = businessTopupSnapshot.data();
                        const businessBalance = businessTopupData.balance;
                        const businessTransactions = businessTopupData.transactions;

                        const businessSale = price * quantity;
                        const newBusinessBalance = businessBalance + businessSale;

                        let dateTime = new Date();
                        const date = dateTime.toLocaleString('en-UK', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric',
                        });
                        const time = dateTime.toLocaleTimeString();
                        dateTime = date + ', ' + time;

                        let newBusinessTransactions = [...businessTransactions];
                        newBusinessTransactions.push({ timestamp: dateTime, amount: businessSale });

                        await updateDoc(doc(db, 'Top Up', storeemail), {
                            balance: newBusinessBalance,
                            transactions: newBusinessTransactions,
                        });

                        // Update user cart
                        const storeRef = doc(db, storeName, itemName);
                        const storeSnapShot = await getDoc(storeRef);
                        const storeData = storeSnapShot.data();
                        const currentQuantity = storeData.quantity;
                        console.log(currentQuantity)
                        await updateDoc(storeRef, { quantity: currentQuantity - quantity });
                        await deleteDoc(items.ref);
                    }

                    alert('Checkout successful!');
                    this.$router.push('/');

                } else {
                    alert('Insufficient funds in your wallet. Please top up.');
                    this.$router.push('/topup/user');
                }

            } catch (error) {
                const errorMessage = error.message;
                alert(errorMessage);
            }
        }
    },
}
</script>

<style scoped>
@import './style.css';
</style>