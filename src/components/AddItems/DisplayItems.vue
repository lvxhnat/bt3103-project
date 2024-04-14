<template>
    <div>
        <table id = "itemTable" class = "listing">
            <tr>
                <td>Image</td>
                <td>Item</td>
                <td>Quantity</td>
                <td>Price</td>
            </tr>
        </table>
    </div>

</template>

<script>
import { getDocs, getFirestore, doc, QuerySnapshot, collection } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import {db} from "/src/firebaseConfig.js";


export default {
    name: "DisplayItems",
    methods: {
        DisplayItemData() {
            const docRef = getDocs(collection(db,"AddItems"))
            docRef.forEach(doc=> {
                let data = doc.data()
                let row  = `<tr>
                        <td><img src = '${data.Image}'/>'</td>
                        <td>${data.Name}</td>
                        <td>${data.Quantity}</td>
                        <td>${data.Price}</td>
                    </tr>`;
                let table = document.getElementById('itemTable')
                table.innerHTML += row
            })
            
        }
    },
    mounted() {
        this.DisplayItemData()
    },
}
</script>