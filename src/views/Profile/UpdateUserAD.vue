<template>
  <div class = "login-container">
    <div class = "navbar">
      <img src="../../assets/logo/logo.png" width="450px" />
      <div class="login-wrapper">
        <button class="navbar-login-button" @click="naviToUserProfile">
          BACK TO PROFILE
        </button>
      </div>
    </div> 
    <div class = "login-form">
      <div class="input-group">
        <label class="label">Address</label>
        <input
          type="text"
          id="address"
          v-model="this.address"
          placeholder="Enter Address"
          required
        />
      </div>
      <div class="input-group">
        <label class="label">Postal Code</label>
        <input
          type="text"
          id="postal"
          v-model="this.postal"
          placeholder="Enter Postal Code"
          required
        />
      </div>
      <button class = "remove-button" @click = "setData(this.address,this.postal)" >Submit Details</button> 
    </div>
  </div>

</template>

<script>
import { updateDoc,doc } from 'firebase/firestore';
import { getAuth } from "firebase/auth";
import { useRouter } from 'vue-router';
import {db} from "/src/firebaseConfig.js"

export default {
    name: 'UpdateUserAD',
    data() {
        return {  
          address: '',
          postal: '',
        }
    },
    methods: {
      async setData(address,postal) {
        const auth = getAuth();
        const email = auth.currentUser.email;
        await updateDoc(doc(db, "Account Details", email), {
          address : this.address,
          postal: this.postal,
        })
        alert("Details updated!")
      }

    },  
    setup() {
      const router = useRouter();

      const naviToUserProfile = () => {
        router.push('/profile/user')
      }

      return {naviToUserProfile}
    },
}


</script>

<style scoped>
@import './style.css';
</style>