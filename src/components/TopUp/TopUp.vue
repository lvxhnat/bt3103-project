<template>
    <v-card color="#118951" class="rounded-lg mt-n3 pb-1" width="344">
        <v-toolbar flat color="transparent">
            <v-toolbar-title class="white--text mt-n2">E-Wallet Balance</v-toolbar-title>
        </v-toolbar>
        <v-card class="rounded-lg mx-2 pa-1 mt-n3 gradient flip" flat>
            <v-card-subtitle>Enter amount (Min S$5.00)</v-card-subtitle>
            <v-container>
                <v-text-field v-model.number="topupAmount" type="number" inputmode="numeric" :rules="[amount]"
                    label="S$" class="amount-input"></v-text-field>
            </v-container>
            <v-card-subtitle>Instant</v-card-subtitle>
            <v-container>
                <v-row class="instant-chips">
                    <v-col v-for="instantAmount in instantOptions" :key="instantAmount">
                        <v-chip outlined @click="updateAmount(instantAmount)" class="chip">{{ instantAmount }}</v-chip>
                    </v-col>
                </v-row>
            </v-container>
            <v-container class="button">
                <v-btn @click="topup(topupAmount)" :disabled="isTopUpDisabled" :loading="loading" class="check-out-btn"
                    type="submit">Top Up</v-btn>
            </v-container>
        </v-card>
    </v-card>
</template>

<script>
export default {
    name: 'TopUp',
    data() {
        return {
            topupAmount: '',
            instantOptions: [5, 10, 20, 50],
            isTopUpDisabled: true,
            loading: false
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
        amount(amount) {
            return amount >= 5 || 'Min top-up amount is S$5.00'
        },
        updateAmount(amount) {
            // Update top-up amount when instant top-up chips are clicked
            this.topupAmount = amount;
        },
        topup(amount) {
            this.loading = true;
            console.log("Top Up Amount: ", amount);
            // Emitting event to notify successful top-up with the amount
            this.$emit('topup-success', amount);
            setTimeout(() => (this.loading = false), 2000)
        }
    }
}
</script>

<style scoped>
.top-up-card {
    width: 300px;
    margin: 0 auto;
    padding: 20px;
}

.title {
    font-size: 24px;
    font-weight: bold;
    margin-bottom: 5px;
}

.amount-input {
    margin-top: 20px;
}

.button {
    text-align: center;
}

.check-out-btn {
    margin-top: 20px;
    background-color: #118951;
    color: white
}
</style>