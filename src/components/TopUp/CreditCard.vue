<template>
    <v-card color="#118951" class="rounded-lg mt-n3 pb-1" width="344">
        <v-toolbar flat color="transparent">
            <v-toolbar-title class="white--text mt-n2">E-Wallet Balance</v-toolbar-title>
        </v-toolbar>
        <v-card color="#118951" class="rounded-lg mx-2 pa-1 mt-n3 gradient flip" flat>
            <span class="grey--text mt-3 ml-4 caption">Balance</span>
            <h2 class="white--text ml-4">S${{ balance }}</h2>
            <v-toolbar flat color="transparent">
                <v-toolbar-title class="grey--text caption">{{ cardOwner }}</v-toolbar-title>
            </v-toolbar>
            <v-card-text class="pt-0 mt-4">
                <span class="white--text font-weight-light">{{ cardNumber }}</span>
            </v-card-text>
        </v-card>
    </v-card>
</template>
  
  <script>
  export default {
    name: 'CreditCard',
    data() {
        return {
            cardNumber: '**** **** **** 6774',
            cardOwner: 'Richard Thomas',
        }
    },
    props: {
        balance: Number
    }
  }
  </script>