<template>
    <div>
        <table id = "itemTable" class = "listing">
            <thead>
                <th>Image</th>
                <th>Item</th>
                <th>Quantity</th>
                <th>Price</th>
            </thead>
        </table>
    </div>

</template>

<script>
import { getDocs, getFirestore, doc, QuerySnapshot, collection , getDoc } from "firebase/firestore";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { auth, db } from '@/firebaseConfig'


export default {
    name: "DisplayItems",
    data() {
        return {
            email: "",
            store: "",
        }
    },
    methods: {
        async displayItemData() {
            const docRef = await getDocs(collection(db,this.store))
            if (!docRef.empty()) {
                docRef.forEach(doc=> {
                    let data = doc.data()
                    let row  = `<tr>
                            <td><img src = '${data.Image}'/></td>
                            <td>${data.Name}</td>
                            <td>${data.Quantity}</td>
                            <td>${data.Price}</td>
                        </tr>`;
                    let table = document.getElementById('itemTable')
                    table.innerHTML += row
                }) 
            } else {
                alert("No items in storage!")
            }
                  
        },
        async getStore(email) {
            const docRef = await getDoc(doc(db,"Account Details",email))
            let data = docRef.data()
            this.store = data.store
            console.log("the store is:" + this.store)
        }
    },
    mounted() {
        onAuthStateChanged(auth,(user) => {
            if (user) {
                this.email = user.email
                this.getStore(this.email)
                this.displayItemData()   
            }
            
        })
        
    },
}
</script>