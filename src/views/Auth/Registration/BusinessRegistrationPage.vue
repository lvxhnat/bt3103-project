<template>
  <NavBar />
  <v-app>
    <div class="registration-container">
      <v-content>
        <v-container fluid class="pa-16 ma-5">
          <img src="../../../assets/auth/registration_floret_1.png" class="img-flore-1" />
          <img src="../../../assets/auth/registration_floret_2.png" class="img-flore-2" />
          <v-form @submit.prevent="register">
            <v-card class="mx-auto pa-12 pb-8" elevation="8" width="400" height="450" rounded="lg">
              <div class="text-h6 mb-6">Business Registration</div>
              <BusinessGoogleSignIn />
              <div class="divider-container">
                <v-divider class="divider-line"></v-divider>
                <div class="divider-text">OR</div>
              </div>
              <div class="text-subtitle-1 text-medium-emphasis">Email</div>
              <v-text-field v-model="email" id="email" type="email" density="compact" placeholder="Email Address"
                prepend-inner-icon="mdi-email-outline" variant="outlined"></v-text-field>
              <div class="text-subtitle-1 text-medium-emphasis d-flex align-center justify-space-between">
                Password
              </div>
              <v-text-field v-model="password" id="password" :append-inner-icon="visible ? 'mdi-eye-off' : 'mdi-eye'"
                :type="visible ? 'text' : 'password'" density="compact" placeholder="Enter your password"
                prepend-inner-icon="mdi-lock-outline" variant="outlined"
                @click:append-inner="visible = !visible"></v-text-field>
              <v-btn block class="mb-8" color="#118951" size="large" variant="tonal" @click="register">Register</v-btn>
            </v-card>
          </v-form>
        </v-container>
      </v-content>
    </div>
  </v-app>
</template>

<script>
import style from './style.css'
import NavBar from '@/components/NavBar'
import AuthInputBox from '@/components/AuthInputBox'
import BusinessGoogleSignIn from '@/components/GoogleSignIn/BusinessGoogleSignIn'
import { createUserWithEmailAndPassword } from 'firebase/auth'
import { collection, addDoc, setDoc, doc } from 'firebase/firestore'
import { auth, db } from '@/firebaseConfig'

export default {
  name: 'BusinessRegistrationPage',
  data() {
    return {
      email: '',
      password: '',
      account: 'business',
    }
  },
  methods: {
    async register() {
      try {
        const userCredential = await createUserWithEmailAndPassword(
          auth,
          this.email,
          this.password
        )
        const user = userCredential.user

        await addDoc(collection(db, 'businesses'), {
          userId: user.uid,
          email: this.email,
          accountType: this.account,
        })

        //Add document for TopUp
        await setDoc(doc(db, 'Top Up', this.email), {
          balance: 0,
          transactions: [],
        })

        alert('Successfully registered!')
        this.$router.push({ path: '/' })
      } catch (error) {
        const errorCode = error.code
        const errorMessage = error.message
        if (errorCode === 'auth/invalid-email') {
          alert('Please enter a valid email.')
        } else if (errorCode === 'auth/email-already-in-use') {
          alert('Email already in use.')
        } else if (errorCode === 'auth/weak-password') {
          alert('Password should be at least 6 characters.')
        } else {
          alert(errorMessage)
        }
      }
    },
  },
  components: {
    NavBar,
    AuthInputBox,
    BusinessGoogleSignIn,
  },
}
</script>
