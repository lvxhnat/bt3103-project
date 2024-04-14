<template>
    <NavBar/>
    <div class = "add-items-con">
        <h1>Store: {{ storename }}</h1>
        <button class = "remove-button" @click = "">Add Items</button>
        <DisplayItems/>
    </div>

</template>

<script>
import { getDoc, getFirestore, doc } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import {firestore} from "/src/firebaseConfig.js";
import DisplayItems from "../../components/AddItems/DisplayItems.vue";

export default {
    name: "AddItemsPage",
    components:{
        DisplayItems,
    },
}

</script>