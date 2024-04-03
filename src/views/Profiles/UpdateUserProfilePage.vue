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
          v-model="user.address"
          placeholder="Enter Address"
          required
        />
      </div>
      <div class="input-group">
        <label class="label">Postal Code</label>
        <input
          type="text"
          id="postal"
          v-model="user.postal"
          placeholder="Enter Postal Code"
          required
        />
      </div> 
    </div>
  </div>

</template>

<script>
import { useRouter } from 'vue-router';

export default {
    name: 'UpdateUserProfile',
    data() {
        return {
            user: {
                address: '',
                postal: '',
            },
        }
    },
    setup() {
      const router = useRouter();

      const naviToUserProfile = () => {
      router.push('/user/userprofile')
      }
      return {naviToUserProfile}
    },
}


</script>

<style>
@import './style.css';
</style>