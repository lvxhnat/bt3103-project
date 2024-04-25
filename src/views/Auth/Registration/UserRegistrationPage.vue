<template>
  <NavBar />
  <v-app>
    <div class="registration-container">
      <v-content>
        <v-container fluid class="pa-16 ma-5">
          <img
            src="../../../assets/auth/registration_floret_1.png"
            class="img-flore-1"
          />
          <img
            src="../../../assets/auth/registration_floret_2.png"
            class="img-flore-2"
          />
          <v-form @submit.prevent="register">
            <v-card
              class="mx-auto pa-12 pb-8"
              elevation="8"
              width="400"
              height="auto"
              rounded="lg"
            >
              <div class="text-h6 mb-6">User Registration</div>
              <div class="text-subtitle-1 text-medium-emphasis">Email</div>
              <v-text-field
                v-model="email"
                id="email"
                :rules="[rule]"
                density="compact"
                placeholder="Email Address"
                prepend-inner-icon="mdi-email-outline"
                variant="outlined"
              ></v-text-field>
              <div
                class="text-subtitle-1 text-medium-emphasis d-flex align-center justify-space-between"
              >
                Password
              </div>
              <v-text-field
                v-model="password"
                id="password"
                :rules="[rule]"
                :append-inner-icon="visible ? 'mdi-eye-off' : 'mdi-eye'"
                :type="visible ? 'text' : 'password'"
                density="compact"
                placeholder="Enter your password"
                prepend-inner-icon="mdi-lock-outline"
                variant="outlined"
                @click:append-inner="visible = !visible"
              ></v-text-field>
              <div class="text-subtitle-1 text-medium-emphasis">Address</div>
              <v-text-field
                v-model="address"
                id="store"
                :rules="[rule]"
                type="text"
                density="compact"
                placeholder="Enter address"
                prepend-inner-icon="mdi-map-marker-outline"
                variant="outlined"
              ></v-text-field>
              <div class="text-subtitle-1 text-medium-emphasis">
                Postal Code
              </div>
              <v-text-field
                v-model="postal"
                id="postal"
                :rules="[rule]"
                type="number"
                density="compact"
                placeholder="Enter postal code"
                prepend-inner-icon="mdi-mailbox-open-outline"
                variant="outlined"
              ></v-text-field>
              <v-btn
                block
                class="mt-2"
                color="#118951"
                size="large"
                variant="tonal"
                @click="register"
                :disabled="isButtonDisabled"
                >Register</v-btn
              >
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
import { createUserWithEmailAndPassword } from 'firebase/auth'
import { collection, addDoc, setDoc, doc } from 'firebase/firestore'
import { auth, db } from '@/firebaseConfig'
import { v4 as uuidv4 } from 'uuid'

export default {
  name: 'UserRegistrationPage',
  data() {
    return {
      email: '',
      password: '',
      account: 'user',
      address: '',
      postal: '',
      isButtonDisabled: true,
    }
  },
  computed: {
    isButtonDisabled() {
      return !(this.email && this.password && this.address && this.postal)
    },
  },
  methods: {
    rule(value) {
      return value != false || 'Field is required'
    },
    async register() {
      try {
        const userCredential = await createUserWithEmailAndPassword(
          auth,
          this.email,
          this.password
        )
        const user = userCredential.user

        await addDoc(collection(db, 'users'), {
          userId: user.uid,
          email: this.email,
          accountType: this.account,
        })
        //Add document for Account Details
        await setDoc(doc(db, 'Account Details', this.email), {
          email: this.email,
          accNo: uuidv4(),
          address: this.address,
          postal: this.postal,
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
  },
}
</script>
