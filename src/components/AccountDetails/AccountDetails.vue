<template>
    <div class = "details">
        <h1 class="account-details-title">Account Details</h1>
        <div class="input-container">
            <h3 class="account-details-input">Email</h3>
            <h2 class="input-acc">{{ email }}</h2>
        </div>
        <div class="input-container">
            <h3 class="account-details-input">Account Number</h3>
            <h2 class="input-acc">{{ accNo }}</h2>
        </div>
        <div class="input-container">
            <h3 class="account-details-input">Address</h3>
            <h2 class="input-acc">{{ address }}</h2>
        </div>
        <div class="input-container">
            <h3 class="account-details-input">Postal Code</h3>
            <h2 class="input-acc">{{ postal }}</h2>
        </div>
    </div>
</template>

<script>
import { getDoc, getFirestore, doc, collection } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import {db} from "/src/firebaseConfig.js";

export default {
    name: 'Account Details', 
    data() {
        return {
            email:"",
            accNo:"",
            address:"",
            postal:"", 
        }    
    },
    methods: {
        async getData(email) {
            const docRef = doc(db, "Account Details", email)
            const docs = await getDoc(docRef);
            const accdet = docs.data();
            this.email = accdet.email;
            this.accNo = accdet.accNo
            this.address = accdet.address
            this.postal = accdet.postal
        }
    },
    async mounted() {
        const auth = getAuth();
        this.email = auth.currentUser.email;
        await this.getData(this.email);
    },
}


</script>

<style>
@import './style.css';
</style>