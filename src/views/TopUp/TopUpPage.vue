<template>
  <NavBar />
  <v-app>
    <div class="main-container">
      <v-content>
        <v-container fluid class="pa-5 ma-2">
          <v-row>
            <v-col cols="6" class="d-flex justify-center">
              <v-row class="left-container">
                <div class="ewallet">
                  <h1 class="ewallet-title">E-Wallet Balance</h1>
                  <h3 class="ewallet-subtitle">Balance</h3>
                  <h1 class="ewallet-balance">S${{ balance }}</h1>
                  <!-- <h3 class="ewallet-name">{{ cardOwner }}</h3> -->
                </div>
                <div class="transactions">
                  <h1 class="title">Top Up History</h1>
                  <div class="table-container">
                    <table>
                      <thead>
                        <tr>
                          <th width="10%">No.</th>
                          <th width="70%">Date</th>
                          <th width="20%">Amount</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr v-for="(transaction, index) in transactions">
                          <td> {{ index + 1 }} </td>
                          <td> {{ transaction.timestamp }} </td>
                          <td> {{ transaction.amount }} </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </v-row>
            </v-col>

            <v-col cols="6" class="d-flex justify-center">
              <div class="topup">
                <h1 class="title">Top Up</h1>
                <div class="topup-container">
                  <h3 class="topup-side-manual">Enter amount (Min S$5.00)</h3>
                  <v-text-field v-model.number="topupAmount" type="number" inputmode="numeric" :rules="[rule]"
                    label="S$" class="topup-side-manual-input"></v-text-field>
                  <h3 class="topup-side-instant">Instant</h3>
                  <v-row class="topup-side-instant-chips">
                    <v-col v-for="instantAmount in instantOptions" :key="instantAmount">
                      <v-chip outlined @click="updateAmount(instantAmount)" class="chip">{{ instantAmount }}</v-chip>
                    </v-col>
                  </v-row>
                  <div class="topup-btn-container">
                    <v-btn @click="topup()" :disabled="isTopUpDisabled" class="topup-btn" type="submit">Top Up</v-btn>
                  </div>
                </div>
              </div>
            </v-col>
          </v-row>
        </v-container>
      </v-content>
    </div>
  </v-app>
</template>

<script>
import NavBar from '@/components/NavBar'
import { db } from '@/firebaseConfig'
import { doc, getDoc, updateDoc } from 'firebase/firestore'
import { getAuth, onAuthStateChanged } from 'firebase/auth'

export default {
  name: 'TopUpPage',
  components: {
    NavBar,
  },
  data() {
    return {
      balance: 0,
      // cardOwner: '',
      topupAmount: 0,
      instantOptions: [5, 10, 20, 50, 100],
      isTopUpDisabled: true,
      useremail: '',
      transactions: []
    }
  },
  watch: {
    topupAmount(newVal) {
      if (newVal < 5) {
        this.isTopUpDisabled = true;
      } else {
        this.isTopUpDisabled = false;
      }
    }
  },
  async mounted() {
    const auth = getAuth();
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        this.useremail = user.email;
        console.log(this.useremail);
        await this.fetchAndUpdateData(this.useremail);
      } else {
        // Redirect to home page
        this.$router.push('/');
      }
    })
  },
  methods: {
    rule(amount) {
      return amount >= 5 || 'Minimum top-up amount is S$5.00'
    },
    updateAmount(amount) {
      // Update top-up amount when instant top-up chips are clicked
      this.topupAmount = amount;
    },
    async fetchAndUpdateData(useremail) {
      try {
        const querySnapShot = await getDoc(doc(db, 'Top Up', useremail));
        const data = querySnapShot.data();
        this.balance = data.balance;
        this.transactions = data.transactions;
      } catch (error) {
        // const errorCode = error.code
        const errorMessage = error.message;
        alert(errorMessage);
      }
    },
    async topup() {
      try {
        const newBalance = this.balance + this.topupAmount;
        let dateTime = new Date();
        const date = dateTime.toLocaleString('en-UK', { year: 'numeric', month: 'long', day: 'numeric' });
        const time = dateTime.toLocaleTimeString();
        dateTime = date + ', ' + time;
        const newTransactions = [...this.transactions];
        newTransactions.push({ timestamp: dateTime, amount: this.topupAmount });

        await updateDoc(doc(db, 'Top Up', this.useremail), {
          'balance': newBalance,
          'transactions': newTransactions,
        })

        this.balance = newBalance;
        this.transactions = newTransactions;
        alert('Successfully Top Up S$' + String(this.topupAmount));
      } catch (error) {
        // const errorCode = error.code
        const errorMessage = error.message;
        alert(errorMessage);
      }
    }
  }
}
</script>

<style scoped>
@import './style.css';
</style>