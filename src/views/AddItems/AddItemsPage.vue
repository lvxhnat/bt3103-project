<template>
    <NavBar/>
    <div class = "add-items-con">
        <h1>Store: {{ store }}</h1>
        <v-btn @click="() => TogglePopup('buttonTrigger')">Add Items</v-btn>
        <AddItems v-if="trigger.buttonTrigger" 
        :TogglePopup="() => TogglePopup('buttonTrigger')"/>
        <DisplayItems/>
    </div>

</template>

<script>
import { getDoc, getFirestore, doc } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import {firestore} from "/src/firebaseConfig.js";
import DisplayItems from "../../components/AddItems/DisplayItems.vue";
import { ref, defineEmits } from 'vue';
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