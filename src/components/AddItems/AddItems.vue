<template>
    <NavBar/>
    <div class = "popup">
        <div class="popup-inner">
            <v-label>Item Image</v-label>
            <v-btn
                id ="input"
                v-model ="this.image"
                :loading ="isSelecting"
                @click ="handleFileImport"
            >
            Upload Image
            </v-btn>
            <input
                ref="uploader"
                type="file"
                @change="onFileChanged"
                
                >
            <v-text-field
                class = "input"
                v-model ="this.name"
                label ="Item Name"
                placeholder ="Enter item name"
                type ="text"
            ></v-text-field>
            <v-text-field
                class = "input"
                v-model ="this.quantity"
                label ="Item Quantity"
                placeholder ="Enter item quantity"
                type ="text"
            ></v-text-field>
            <v-text-field
                class = "input"
                v-model ="this.price"
                label ="Item Price"
                placeholder ="Enter item price"
                type ="text"
            ></v-text-field>
            <v-btn  @click ="TogglePopup();updateItems()">Submit Item</v-btn>
        </div>
    </div>
</template>

<script>
import { updateDoc, doc, getDoc , collection, query, where, getDocs, addDoc} from 'firebase/firestore';
import {db,auth} from "/src/firebaseConfig.js"
import { getAuth, onAuthStateChanged } from "firebase/auth";
import NavBar from '../NavBar/NavBar.vue';

export default {
    name: "AddItems",
    data() {
        return {
            name:"",
            quantity:"",
            price: "",
            image:"",
            isSelecting:false,
            selectedFile:null
        }
    },
    methods: {
        async updateItems() {
            onAuthStateChanged(auth,(user) => {
                if (user) {
                    this.email = user.email   
                }
            })
            const docRef = await getDoc(doc(db, "Account Details", this.email))
            const myData = docRef.data()
            const collectionRef = collection(db, myData.store);
            const q = query(collectionRef, where('Name', '==', this.name));

            getDocs(q)
            .then(async (querySnapshot) => {
                if (!querySnapshot.empty) {
                    // Document with the specified name exists
                    querySnapshot.forEach(async (docc) => {
                        await updateDoc(docc, {
                            Name: this.name,
                            Quantity: this.quantity,
                            Price: this.price,
                            Image: this.image,
                        })
                    });
                    alert("Item updated!")
                } else {
                    await addDoc(collectionRef, {
                        Name: this.name,
                        Quantity: this.quantity,
                        Price: this.price,
                        Image: this.image,
                    })
                    alert("New Item added!")
                }
            })
            .catch((error) => {
                console.error('Error checking document:', error);
            });

        },
        handleFileImport() {
            this.isSelecting = true;

            window.addEventListener('focus', () => {
                this.isSelecting = false
            },{once:true})

            this.$refs.uploader.click()
        },
        onFileChanged(event) {
            this.selectedFile = event.target.files[0]
        }
    
    },
    components: {
        NavBar,
    },
    props: ['TogglePopup']
}

</script>

<style scoped>
.popup {
	position: fixed;
	top: 0;
	left: 0;
	right: 0;
	bottom: 0;
	z-index: 99;
	background-color: rgba(0, 0, 0, 0.2);
	
	display: flex;
	align-items: center;
	justify-content: center;

	.popup-inner {
		background: #FFF;
		padding: 32px;
	}
}
</style>