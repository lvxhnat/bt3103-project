<template>   
    <template v-if = "user.accountType === 'user'">
        <div class = "details">
            <h1 class="account-details-title">Account Details</h1>
            <div class="input-container">
                <h3 class="account-details-input">Email</h3>
                <h2 class="input-acc">{{ user.email }}</h2>
            </div>
            <div class="input-container">
                <h3 class="account-details-input">Account Number</h3>
                <h2 class="input-acc">{{ user.accNo }}</h2>
            </div>
            <div class="input-container">
                <h3 class="account-details-input">Address</h3>
                <h2 class="input-acc">{{ user.address }}</h2>
            </div>
            <div class="input-container">
                <h3 class="account-details-input">Postal Code</h3>
                <h2 class="input-acc">{{ user.postal }}</h2>
            </div>
        </div>
    </template>
    <!-- Display Business Account if not user-->
    <template v-else>
        <div class = "details">
            <h1 class="account-details-title">Account Details</h1>
            <div class="input-container">
                <h3 class="account-details-input">Email</h3>
                <h2 class="input-acc">{{ business.email }}</h2>
            </div>
            <div class="input-container">
                <h3 class="account-details-input">Account Number</h3>
                <h2 class="input-acc">{{ business.accNo }}</h2>
            </div>
            <div class="input-container">
                <h3 class="account-details-input">Store Name</h3>
                <h2 class="input-acc">{{ business.store }}</h2>
            </div>
            <div class="input-container">
                <h3 class="account-details-input">Store Address</h3>
                <h2 class="input-acc">{{ business.address }}</h2>
            </div>
            <div class="input-container">
                <h3 class="account-details-input">Postal Code</h3>
                <h2 class="input-acc">{{ business.postal }}</h2>
            </div>
            <div class = "edit-image-con">
                <img src = {{ business.image }}/>
                <h3 class="account-details-input">Edit Store Image</h3>
            </div>
        </div>
    </template>
</template>

<script>
import { getDoc, getFirestore, doc, collection, getDocs,query} from "firebase/firestore";
import { onAuthStateChanged, signOut } from 'firebase/auth'
import { getAuth } from "firebase/auth";
import {db} from "/src/firebaseConfig.js";

export default {
    name: 'Account Details', 
    data() {
        return {
            user: {
                email:"",
                accNo:"",
                address:"",
                postal:"", 
            },
            business: {
                email:"",
                accNo:"",
                store: "",
                address:"",
                postal:"", 
                image: "",
            }
        }    
    },
    methods: {
        async getUserData(email) {
            const docRef = doc(db, "Account Details", email)
            const docs = await getDoc(docRef);
            const accdet = docs.data();
            this.email = accdet.email;
            this.accNo = accdet.accNo
            this.address = accdet.address
            this.postal = accdet.postal
        },
        async getBusiData(email) {
            const docRef = doc(db, "Account Details", email)
            const docs = await getDoc(docRef);
            const accdet = docs.data();
            this.email = accdet.email;
            this.accNo = accdet.accNo
            this.store = accdet.store
            this.address = accdet.address
            this.postal = accdet.postal
            this.image = accdet.image
        }
    },
    async mounted() {
        const auth = getAuth();
        this.email = auth.currentUser.email;
        onAuthStateChanged(auth, async (newUser) => {
            try {
            const userSnapshot = await getDocs(
                query(collection(db, 'users'), where('userId', '==', newUser.uid))
            )
            if (!userSnapshot.empty) {
                await getUserData(this.email);
            } else {
                const businessSnapshot = await getDocs(
                query(
                    collection(db, 'businesses'),
                    where('userId', '==', newUser.uid)
                )
                )
                if (!businessSnapshot.empty) {
                    await getBusiData(this.email);
                }
            }
            } catch (error) {
            console.error('Error fetching user data:', error.message)
            // Handle error fetching user data
            }
        })  
    },
}


</script>

<style>
@import './style.css';
</style>