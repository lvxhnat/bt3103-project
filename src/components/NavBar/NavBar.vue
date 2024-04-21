<template>
  <v-app>
    <v-app-bar
      style="padding: 0px 90px"
      app
      color="#118951"
      dark
      elevation="6"
      elevate-on-scroll
    >
      <router-link to="/" style="text-decoration: none; color: inherit">
        <v-app-bar-title style="color: #f8f4ed">SECONDSERVINGS</v-app-bar-title>
      </router-link>

      <v-spacer></v-spacer>

      <v-list class="d-flex align center" style="background-color: #118951">
        <template v-if="!user">
          <v-btn
            variants="outlined"
            color="#f8f4ed"
            @click="navigateToUserLogin"
          >
            USER LOGIN
          </v-btn>
          <v-btn outlined color="#f8f4ed" @click="navigateToBusinessLogin">
            BUSINESS LOGIN
          </v-btn>
        </template>
        <template v-else>
          <!-- Display "USER PROFILE" button for user accounts -->
          <template v-if="user.accountType === 'user'">
            <v-btn
              variants="outlined"
              color="#f8f4ed"
              @click="navigateToUserProfile"
            >
              USER PROFILE
            </v-btn>
          </template>
          <!-- Display "BUSINESS PROFILE" button for business accounts -->
          <template v-else-if="user.accountType === 'business'">
            <v-btn outlined color="#f8f4ed" @click="navigateToBusinessProfile">
              BUSINESS PROFILE
            </v-btn>
          </template>
          <v-btn outlined color="#f8f4ed" @click="logout"> LOGOUT </v-btn>
        </template>
      </v-list>
    </v-app-bar>
  </v-app>
</template>

<script>
import { defineComponent, ref } from 'vue'
import { useRouter } from 'vue-router'
import { auth, db } from '../../firebaseConfig'
import { onAuthStateChanged } from 'firebase/auth'
import { collection, getDocs, query, where } from 'firebase/firestore'

export default defineComponent({
  name: 'NavBar',
  setup() {
    const router = useRouter()

    const navigateToUserLogin = () => {
      router.push('/login/user')
    }
    const navigateToBusinessLogin = () => {
      router.push('/login/business')
    }

    const navigateToUserProfile = () => {
      router.push('/profile/user')
    }
    const navigateToBusinessProfile = () => {
      router.push('/profile/business')
    }

    const user = ref(null)

    const logout = async () => {
      try {
        await auth.signOut()
        alert('Signed out successfully.')
        router.push('/')
      } catch (error) {
        console.error('Error logging out:', error.message)
        alert('Error logging out:', error.message)
      }
    }

    onAuthStateChanged(auth, async (newUser) => {
      if (newUser) {
        try {
          let userData = null
          const userSnapshot = await getDocs(
            query(collection(db, 'users'), where('userId', '==', newUser.uid))
          )
          if (!userSnapshot.empty) {
            userData = userSnapshot.docs[0].data()
          } else {
            const businessSnapshot = await getDocs(
              query(
                collection(db, 'businesses'),
                where('userId', '==', newUser.uid)
              )
            )
            if (!businessSnapshot.empty) {
              userData = businessSnapshot.docs[0].data()
            }
          }
          if (userData) {
            user.value = {
              ...userData,
              uid: newUser.uid,
            }
          }
        } catch (error) {
          console.error('Error fetching user data:', error.message)
          // Handle error fetching user data
        }
      } else {
        user.value = null
      }
    })

    return {
      user,
      navigateToUserLogin,
      navigateToBusinessLogin,
      navigateToUserProfile,
      navigateToBusinessProfile,
      logout,
    }
  },
})
</script>
