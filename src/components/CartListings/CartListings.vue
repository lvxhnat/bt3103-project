<template>
    <table class="carttable">
        <thead>
            <tr>
            <th width = "30%">Item</th>
            <th width = "30%">Quantity</th>
            <th width = "15%">Total Price</th>
            <th width = "25%">Option</th>
            </tr>
        </thead>

        <tbody>
            <tr v-for="item in items" :key="item.id">
                <td>
                    <div>{{ item.name }}</div>
                    <div>(ID: {{ item.id }})</div>
                </td>
                
                <td class="quantity-options">
                    <span class="quantity">{{ item.quantity }}</span>
                    <div class="button-options">
                    <v-chip class="increase-button" @click="decrement(item)">-</v-chip>
                    <v-chip class="decrease-button" @click="increment(item)">+</v-chip>
                    </div>
                </td>

                <td> {{ totalPrice(item) }}</td>

                <td>
                    <v-btn class="remove-button" @click="removeItem(item.id)">Remove Item</v-btn>
                </td>
            </tr>
        </tbody>
    </table>
</template>


<script>
import { getAuth } from 'firebase/auth'
import { db } from '/src/firebaseConfig.js'
import { collection, doc, deleteDoc, getDocs, getDoc, updateDoc } from 'firebase/firestore'

export default {
    name: 'CartListing',
    props: {
        userEmail: String,
    }, 

    data() {
        return {
            items: [],
        }
    },

    mounted() {
        this.fetchItems();
        this.emitTotalPrice();
    },

    watch: {
        items: {
            handler() {
                this.emitTotalPrice();
            },
            deep: true
        }
    },

    methods: {
        async fetchItems() {
            try {
                const user = getAuth().currentUser;
                if (!user) {
                    return;
                }
                const userEmail = user.email;
                const itemsRef = collection(db, userEmail); // Assuming items are stored under collection with user's email
                const querySnapshot = await getDocs(itemsRef);
                const fetchedItems = [];
                querySnapshot.forEach((doc) => {
                    const itemData = doc.data();
                    fetchedItems.push({
                        id: doc.id,
                        name: itemData.name,
                        quantity: itemData.quantity,
                        price: itemData.price,
                        store: itemData.store,
                    });
                });
                this.items = fetchedItems; 
                console.log(this.items);
            } catch (error) {
                const errorMessage = error.message;
                alert(errorMessage);          
            }
        },

        async increment(item) {
            try {
                const user = getAuth().currentUser;
                if (!user) {
                    return;
                }
                const userEmail = user.email;

                const storeRef = doc(db, item.store, item.name);
                const storeDoc = await getDoc(storeRef);
                const availableQuantity = storeDoc.data().quantity;

                if (item.quantity < availableQuantity) {
                    const itemRef = doc(db, userEmail, item.id);
                    await updateDoc(itemRef, {
                        quantity: item.quantity + 1 // Increment the quantity in the database
                    });
                    item.quantity++; // Increment the quantity in the local data after successful update
                } else {
                    alert("Maximum quantity reached");
                }
            } catch (error) {
                alert(error.message);
            }
        },

        async decrement(item) {
            if (item.quantity > 1) {
                try {
                    const user = getAuth().currentUser;
                    if (!user) {
                        return;
                    }
                    const userEmail = user.email;
                    const itemRef = doc(db, userEmail, item.id);
                    await updateDoc(itemRef, {
                        quantity: item.quantity - 1 // Decrement the quantity in the database
                    });
                    item.quantity--; // Decrement the quantity in the local data after successful update
                } catch (error) {
                    alert(error.message);
                }
            }
        },
            
        totalPrice(item) {
            return item.price * item.quantity;
        },

        calculateTotalPrice() {
            return this.items.reduce((total, item) => total + (item.price * item.quantity), 0);
        },

        emitTotalPrice() {
            this.$emit('total-price-updated', this.calculateTotalPrice());
        },
    
        async removeItem(itemId) {
            try {
                const user = getAuth().currentUser;
                if (!user) {
                return;
                }
                const userEmail = user.email;
                const itemRef = doc(db, userEmail, itemId);
                await deleteDoc(itemRef);
                this.items = this.items.filter(item => item.id !== itemId);
            } catch (error) {
                alert(error.message);
            }
        },
    }
}
</script>


<style scoped>
@import './style.css';
</style>
