<!-- <template>
  <div>
    <NavBar />
    <v-container>
      <v-row>
        <v-col cols="6">
          <CreditCard :balance="totalAmount" />
        </v-col>
        <v-row>
          <v-col cols="6">
            <TopUp @topup-success="handleTopupSuccess" />
          </v-col>
        </v-row>
        <v-col cols="6">
          <Transactions :transactions="transactions" />
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import NavBar from '@/components/NavBar'
import CreditCard from '@/components/TopUp/CreditCard.vue'
import Transactions from '@/components/TopUp/Transactions.vue'
import TopUp from '@/components/TopUp/TopUp.vue'

export default {
  name: 'TopUpPage',
  data() {
    return {
      totalAmount: 0,
      transactions: []
    }
  },
  methods: {
    handleTopupSuccess(amount) {
      this.totalAmount += amount;
      const transaction = {
        amount: amount,
        date: new Date().toLocaleDateString(),
      };
      this.transactions.push(transaction);

    }
  },
  components: {
    NavBar,
    CreditCard,
    Transactions,
    TopUp
  }
}
</script> -->

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
                  <h3 class="ewallet-name">{{ cardOwner }}</h3>
                </div>
                <div class="transactions">
                  <h1 class="title">Top Up History</h1>
                  <div class="table-container">
                    <table>
                      <thead>
                        <tr>
                          <th width="20%">No.</th>
                          <th width="50%">Date</th>
                          <th width="30%">Amount</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr v-for="transaction in transactions" :key="transaction.id">
                          <td> {{ transaction.id }} </td>
                          <td> {{ transaction.dateTime }} </td>
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
                    <v-btn @click="topup(topupAmount)" :disabled="isTopUpDisabled" :loading="loading" class="topup-btn"
                      type="submit">Top Up</v-btn>
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

export default {
  name: 'TopUpPage',
  components: {
    NavBar,
  },
  data() {
    return {
      balance: 10000,
      cardOwner: 'BT3103',
      topupAmount: '',
      instantOptions: [5, 10, 20, 50],
      isTopUpDisabled: true,
      loading: false,
      transactions: [
        { id: 1, dateTime: new Date().toDateString(), amount: 20 },
        { id: 2, dateTime: '2024 2pm', amount: 40 },
        { id: 3, dateTime: '2024 1pm', amount: 20 },
        { id: 4, dateTime: '2024 2pm', amount: 40 },
        { id: 5, dateTime: '2024 1pm', amount: 20 },
        { id: 6, dateTime: '2024 2pm', amount: 40 },
        { id: 7, dateTime: '2024 1pm', amount: 20 },
        { id: 8, dateTime: '2024 2pm', amount: 40 },
        { id: 7, dateTime: '2024 1pm', amount: 20 },
        { id: 8, dateTime: '2024 2pm', amount: 40 },
      ]
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
  methods: {
    rule(amount) {
      return amount >= 5 || 'Minimum top-up amount is S$5.00'
    },
    updateAmount(amount) {
      // Update top-up amount when instant top-up chips are clicked
      this.topupAmount = amount;
    },
    topup(amount) {
      this.loading = true;
      console.log("Top Up Amount: ", amount);
      // Emitting event to notify successful top-up with the amount
      // this.$emit('topup-success', amount);
      setTimeout(() => (this.loading = false), 2000)
    }
  }
}
</script>

<style scoped>
@import './style.css';
</style>