<template>
  <div>
    <h1>Store: {{ this.store }}</h1>
    <v-btn @click="() => TogglePopup('buttonTrigger')">Add Items</v-btn>
    <AddItems
      v-if="trigger.buttonTrigger"
      :TogglePopup="() => TogglePopup('buttonTrigger')"
    />
    <DisplayItems />
  </div>
</template>

<script>
import DisplayItems from "../../components/AddItems/DisplayItems.vue";
import { ref,} from 'vue';
import AddItems from "../../components/AddItems/AddItems.vue";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import {db,auth} from "/src/firebaseConfig.js"
import { updateDoc, doc, getDoc , collection, query, where, getDocs, addDoc,setDoc} from 'firebase/firestore';


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
    mounted() {
        onAuthStateChanged(auth, async (user) => {
                if(user) {
                    const docRef = doc(db, 'Account Details', user.email)
                    const docs = await getDoc(docRef)
                    const accdet = docs.data()
                    this.store = accdet.store
                }
            })
    }
}
</script>

<style></style>
