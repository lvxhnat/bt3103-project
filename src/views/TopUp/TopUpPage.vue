<template>
  <NavBar />
  <v-app>
    <div class="main-container">
      <v-container fluid class="pt-8 ma-2">
        <v-row>
          <v-col cols="6" class="d-flex justify-center">
            <v-row class="left-container">
              <v-card tonal color="#118951" class="mb-4" style="height: 130px; margin-top: 30px;">
                <v-card-title>E-wallet Balance</v-card-title>
                <v-card-subtitle>Balance</v-card-subtitle>
                <v-card-item>
                  <div>
                    <div class="text-h6 mb-1">S${{ balance }}</div>
                  </div>
                </v-card-item>
              </v-card>

              <v-card style="height: 255px">
                <v-card-title>Top-up History</v-card-title>
                <v-card-item class="pb-3 pl-3 pr-3">
                  <div class="topup-table-container">
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
                          <td>{{ index + 1 }}</td>
                          <td>{{ transaction.timestamp }}</td>
                          <td>{{ transaction.amount }}</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </v-card-item>
              </v-card>
            </v-row>
          </v-col>

          <v-col cols="6" class="d-flex justify-center">
            <v-card style="height: 400px; width: 450px; margin-top: 30px">
              <v-card-title>Top-up</v-card-title>
              <v-card-subtitle>Enter top-up amount (min S$5)</v-card-subtitle>
              <v-card-text>
                <v-text-field
                  v-model.number="topupAmount"
                  type="number"
                  inputmode="numeric"
                  :rules="[rule]"
                  label="S$"
                  class="topup-side-manual-input"
                ></v-text-field>
                <v-card-subtile>Instant top-up amount</v-card-subtile>
                <v-row class="topup-side-instant-chips">
                  <v-col
                    v-for="instantAmount in instantOptions"
                    :key="instantAmount"
                  >
                    <v-chip
                      outlined
                      @click="updateAmount(instantAmount)"
                      class="chip"
                      >{{ instantAmount }}</v-chip
                    >
                  </v-col>
                </v-row>

                <div class="topup-btn-container">
                  <v-btn
                    @click="topup()"
                    :disabled="isTopUpDisabled"
                    color="#118951"
                    type="submit"
                    >Top Up</v-btn
                  >
                </div>
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12" class="justify-center">
            <v-card>
              <v-card-title>Top-up History Graph</v-card-title>
              <v-card-item class="pl-3 pr-3 pb-3">
                <line-chart :data="chartData"></line-chart>
              </v-card-item>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
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
      transactions: [],
      chartData: [],
    }
  },
  watch: {
    topupAmount(newVal) {
      if (newVal < 5) {
        this.isTopUpDisabled = true
      } else {
        this.isTopUpDisabled = false
      }
    },
  },
  async mounted() {
    const auth = getAuth()
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        this.useremail = user.email
        await this.fetchAndUpdateData(this.useremail)
      } else {
        // Redirect to home page
        this.$router.push('/')
      }
    })
  },
  methods: {
    rule(amount) {
      return amount >= 5 || 'Minimum top-up amount is S$5.00'
    },
    updateAmount(amount) {
      // Update top-up amount when instant top-up chips are clicked
      this.topupAmount = amount
    },
    async fetchAndUpdateData(useremail) {
      try {
        const querySnapShot = await getDoc(doc(db, 'Top Up', useremail))
        const data = querySnapShot.data()
        this.balance = data.balance
        this.transactions = data.transactions
        this.chartData = this.transactions.map((transaction) => {
          return [new Date(transaction.timestamp), transaction.amount]
        })
      } catch (error) {
        // const errorCode = error.code
        const errorMessage = error.message
        alert(errorMessage)
      }
    },
    async topup() {
      try {
        const newBalance = this.balance + this.topupAmount
        let dateTime = new Date()
        const date = dateTime.toLocaleString('en-UK', {
          year: 'numeric',
          month: 'long',
          day: 'numeric',
        })
        const time = dateTime.toLocaleTimeString()
        dateTime = date + ', ' + time
        const newTransactions = [...this.transactions]
        newTransactions.push({ timestamp: dateTime, amount: this.topupAmount })

        await updateDoc(doc(db, 'Top Up', this.useremail), {
          balance: newBalance,
          transactions: newTransactions,
        })

        this.balance = newBalance
        this.transactions = newTransactions
        this.chartData = this.transactions.map((transaction) => {
          return [new Date(transaction.timestamp), transaction.amount]
        })

        alert('Successfully Top Up S$' + String(this.topupAmount))
      } catch (error) {
        // const errorCode = error.code
        const errorMessage = error.message
        alert(errorMessage)
      }
    },
  },
}
</script>

<style scoped>
@import './style.css';
</style>
