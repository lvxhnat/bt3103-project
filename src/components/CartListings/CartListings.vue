<template>
    <table class="carttable">
        <thead>
            <tr>
            <th width = "30%">Item</th>
            <th width = "30%">Quantity</th>
            <th width = "15%">Total Price</th>
            <th width = "25%">Option</th>
            </tr>
        </thead>

        <tbody>
            <tr v-for="item in items" :key="item.id">
                <td>
                    <div>{{ item.name }}</div>
                    <div>(ID {{ item.id }})</div>
                </td>
                
                <td class="quantity-options">
                    <span class="quantity">{{ item.quantity }}</span>
                    <div class="button-options">
                    <v-chip class="increase-button" @click="decrement(item)">-</v-chip>
                    <v-chip class="decrease-button" @click="increment(item)">+</v-chip>
                    </div>
                </td>

                <td> {{ totalPrice(item) }}</td>

                <td>
                    <v-btn class="remove-button" @click="removeItem(item.id)">Remove Item</v-btn>
                </td>
            </tr>
        </tbody>
    </table>
</template>


<script>
export default {
    name: 'CurrentListings',
    props: {
        items: Array,
    }, 

    data() {
        return {
            items: [
                { id: 'XXX', name: 'Bread', quantity: 10, availableQuantity: 10, price: 2},
                { id: 'XYZ', name: 'Potato', quantity: 7, availableQuantity: 7, price: 3},
            ],
        }
    },

    methods: {
        increment(item) {
            if (item.quantity < item.availableQuantity) {
                item.quantity++;
            }
        },
    
        decrement(item) {
            if (item.quantity > 1) {
                item.quantity--;
            }
        },

        totalPrice(item) {
            return item.price * item.quantity;
        },
    
        removeItem(itemId) {
            this.items = this.items.filter((item) => item.id !== itemId)
        },
    }
}
</script>


<style scoped>
@import './style.css';
</style>
