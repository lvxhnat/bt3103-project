<template>
  <div class="main-container">
    <table id="itemTable" class="listing">
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
import {
  getDocs,
  getFirestore,
  doc,
  QuerySnapshot,
  collection,
  getDoc,
  query,
} from 'firebase/firestore'
import { getAuth, onAuthStateChanged } from 'firebase/auth'
import { auth, db } from '@/firebaseConfig'
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage'


export default {
  name: 'DisplayItems',
  data() {
    return {
      email: '',
      store: '',
    }
  },
  methods: {
    async displayItemData() {
      onAuthStateChanged(auth, async (user) => {
        if (user) {
          this.email = user.email
          const dRef = await getDoc(doc(db, 'Account Details', this.email))
          let myData = dRef.data()
          this.store = myData.store
          const docRef = await getDocs(collection(db, this.store))
          if (!docRef.empty) {
            docRef.forEach((doc) => {
              let data = doc.data()
              let row = `<tr>
                                    <td><img src = '${data.image}'/></td>
                                    <td>${data.name}</td>
                                    <td>${data.quantity}</td>
                                    <td>${data.price}</td>
                                </tr>`;
                            let table = document.getElementById('itemTable')
                            table.innerHTML += row
                        })
                        
                    } else {
                        alert("No items in storage!")
                    }  
                }
            })      
        },
    },
    mounted() {
        this.displayItemData()
    },
}
</script>
