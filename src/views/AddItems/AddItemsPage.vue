<template>
    <div>
        <h1>Store: {{ store }}</h1>
        <v-btn @click="() => TogglePopup('buttonTrigger')">Add Items</v-btn>
        <AddItems v-if="trigger.buttonTrigger" 
        :TogglePopup="() => TogglePopup('buttonTrigger')"/>
        <DisplayItems/>
    </div>
</template>

<script>
import DisplayItems from "../../components/AddItems/DisplayItems.vue";
import { ref,} from 'vue';
import AddItems from "../../components/AddItems/AddItems.vue";



export default {
    name: "AddItemsPage",
    data() {
        return {
            store: "",
        }
    },  
    setup() {
        const trigger = ref({
            buttonTrigger: false,
        })

        const TogglePopup = (tri) => {
            trigger.value[tri] = !trigger.value[tri]
        }

        return { trigger, TogglePopup }
    },
    components:{
        DisplayItems,
        AddItems,
    },
}

</script>

<style>

</style>