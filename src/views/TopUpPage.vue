<template>
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
</script>