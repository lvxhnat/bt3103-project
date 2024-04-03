<template>
    <div class = "userprofile">
      <div class = "navbar">
        <img src="../../assets/logo/logo.png" width="450px" />
        <div class="login-wrapper">
          <button class="navbar-login-button" @click="naviToUserHome">
            BACK TO HOME
          </button>
        </div>
      </div>
      <div class = "left-panel">
        <AccountDetails/>
      </div>
      <div class = "right-panel">

      </div>
      <div>
        <button class = "updateprofile" @click = "navigateToUpdateUserProfile">Update Profile</button>
      </div>
    </div>
</template>


<script>
import AccountDetails from '../../components/AccountDetails/AccountDetails.vue';
import { useRouter } from 'vue-router'

export default {
  name: 'UserProfilePage',
  setup() {
    const router = useRouter()

    const navigateToUpdateUserProfile = () => {
      router.push('/userprofile/updateprofile')
    }

    return { navigateToUpdateUserProfile }
  },
  components: {
    AccountDetails,
  },
}
</script>

<style>
@import './style.css';
</style>