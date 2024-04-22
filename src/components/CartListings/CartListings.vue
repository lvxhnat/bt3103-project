<template>
    <table>
        <thead>
            <tr>
            <th>Item</th>
            <th>Quantity</th>
            <th>Total Price</th>
            <th></th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="item in items" :key="item.id">
                <td>
                    <div>{{ item.name }}</div>
                    <div>(ID {{ item.id }})</div>
                </td>
                
                <td class="cell-increment">
                    <span>{{ item.quantity }}</span>
                    <button class="increment-button" @click="increment(item)">+</button>
                    <button class="increment-button" @click="decrement(item)">-</button>
                </td>
                <td>
                    <button class="remove-button" @click="removeItem(item.id)">Remove Item</button>
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
}

</script>


<style scoped>
@import './style.css';
</style>
