<template>
    <v-card color="#118951" class="rounded-lg mt-n3 pb-1" width="344">
        <v-toolbar flat color="transparent">
            <v-toolbar-title class="white--text mt-n2">Top-up History</v-toolbar-title>
        </v-toolbar>
        <v-card class="rounded-lg mx-2 pa-1 mt-n3 gradient flip" flat>
            <!-- Check if there are transactions -->
            <v-list v-if="transactions && transactions.length" class="mt-n2" color="transparent" dense>
                <v-list-item v-for="transaction in transactions" :key="transaction.date">
                    <v-list-item-content>
                        <v-row>
                            <v-col>
                                <v-list-item-avatar><v-icon color="#118951" size="40"
                                        icon="mdi-arrow-up-drop-circle-outline"></v-icon></v-list-item-avatar>
                            </v-col>
                            <v-col>
                                <v-list-item-title>{{ transaction.date }}</v-list-item-title>
                                <v-list-item-subtitle>S${{ transaction.amount }}</v-list-item-subtitle>
                            </v-col>
                        </v-row>
                    </v-list-item-content>
                    <v-divider></v-divider>
                </v-list-item>
            </v-list>
            <!-- If there are no transactions, display "No transaction" -->
            <v-list v-else class="mt-n2" color="transparent" dense>
                <v-list-item-content>
                    <v-list-item-title class="ml-4 mt-2">No transaction</v-list-item-title>
                </v-list-item-content>
            </v-list>
        </v-card>
    </v-card>
</template>

<script>
export default {
    props: {
        transactions: Array
    }
}
</script>