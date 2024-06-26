<template>
  <NavBar />
  <v-app>
    <div class="add-items-container">
      <v-container fluid class="ma-9 pt-10">
        <v-card
          variant="tonal"
          color="#118951"
          class="mb-4"
          style="height: 100px"
        >
          <v-card-title>Store: {{ store }}</v-card-title>
          <v-btn @click="showAddItemDialog" variant="text">Add Item</v-btn>
        </v-card>

        <v-dialog v-model="addItemDialog" max-width="600">
          <v-card>
            <v-card-title>Add New Item</v-card-title>
            <v-card-text>
              <v-form @submit.prevent="addItem">
                <div class="text-subtitle-1 text-medium-emphasis">
                  Item Image
                </div>
                <div v-if="this.image">
                  <img
                    id="img"
                    :src="this.imageFile"
                    class="add-items-uploaded-image"
                  />
                </div>
                <v-btn variant="text" @click="onPickFile">
                  Upload item image
                </v-btn>
                <input
                  type="file"
                  style="display: none"
                  ref="fileInput"
                  accept="image/*"
                  @change="onFilePicked"
                />

                <div class="text-subtitle-1 text-medium-emphasis">
                  Item Name
                </div>
                <v-text-field
                  v-model="this.name"
                  type="text"
                  :rules="[rule]"
                  required
                  id="name"
                  density="compact"
                  placeholder="Enter item name"
                  prepend-inner-icon="mdi-form-textbox"
                  variant="outlined"
                ></v-text-field>

                <div class="text-subtitle-1 text-medium-emphasis">
                  Item Price
                </div>
                <v-text-field
                  v-model="this.price"
                  type="number"
                  :rules="[rule]"
                  required
                  id="price"
                  density="compact"
                  placeholder="Enter item price"
                  prepend-inner-icon="mdi-cash"
                  variant="outlined"
                ></v-text-field>

                <div class="text-subtitle-1 text-medium-emphasis">
                  Item Quantity
                </div>
                <v-text-field
                  v-model="this.quantity"
                  type="number"
                  :rules="[rule]"
                  required
                  id="quantity"
                  density="compact"
                  placeholder="Enter item quantity"
                  prepend-inner-icon="mdi-numeric"
                  variant="outlined"
                ></v-text-field>

                <v-btn
                  block
                  class="mb-8"
                  color="#118951"
                  size="large"
                  variant="tonal"
                  @click="addItem"
                  :disabled="isButtonDisabled"
                  >Add Item</v-btn
                >
              </v-form>
            </v-card-text>
          </v-card>
        </v-dialog>

        <v-card style="height: 450px">
          <v-card-title>Items</v-card-title>
          <v-card-item class="pb-3 pl-3 pr-3">
            <div class="add-items-table-container">
              <table id="itemTable">
                <thead>
                  <tr>
                    <th width="31%">Image</th>
                    <th width="23%">Item</th>
                    <th width="23%">Quantity</th>
                    <th width="23%">Price</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="item in items" :key="item.name">
                    <td width="15%">
                      <img :src="item.image" class="add-items-uploaded-image" />
                    </td>
                    <td>{{ item.name }}</td>
                    <td>{{ item.quantity }}</td>
                    <td>{{ item.price }}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </v-card-item>
        </v-card>
      </v-container>
    </div>
  </v-app>
</template>

<script>
import NavBar from '@/components/NavBar'
import { getAuth, onAuthStateChanged } from 'firebase/auth'
import { db } from '/src/firebaseConfig.js'
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage'
import {
  doc,
  getDoc,
  collection,
  getDocs,
  setDoc,
  updateDoc,
} from 'firebase/firestore'

export default {
  name: 'AddItemsPage',
  data() {
    return {
      email: '',
      name: '',
      quantity: '',
      price: '',
      image: '',
      imageFile: '',
      store: '',
      addItemDialog: false,
      isButtonDisabled: true,
      items: [],
    }
  },
  computed: {
    isButtonDisabled() {
      return !(this.name && this.quantity && this.price && this.image)
    },
  },
  methods: {
    rule(value) {
      return value != false || 'Field is required'
    },
    async displayItemData() {
      onAuthStateChanged(getAuth(), async (user) => {
        if (user) {
          this.email = user.email
          const docRef = await getDoc(doc(db, 'Account Details', this.email))
          const userData = docRef.data()
          this.store = userData.store

          const querySnapshot = await getDocs(collection(db, this.store))
          this.items = querySnapshot.docs.map((doc) => doc.data())
        }
      })
    },
    showAddItemDialog() {
      this.addItemDialog = true
    },
    async addItem() {
      const newItem = {
        name: this.name.trim(),
        quantity: parseInt(this.quantity),
        price: parseFloat(this.price),
        image: '',
      }

      const docRef = doc(db, this.store, newItem.name)
      await setDoc(docRef, newItem)

      const storage = getStorage()
      const storageRef = ref(
        storage,
        'store-' + this.store + '/item-' + this.name
      )
      const snapshot = await uploadBytes(storageRef, this.image)
      const downloadURL = await getDownloadURL(snapshot.ref)

      await updateDoc(docRef, {
        image: downloadURL,
      })

      // Clear form fields after adding item
      this.name = ''
      this.quantity = ''
      this.price = ''
      this.image = ''

      // Close the dialog
      this.addItemDialog = false
      alert('Item successfully added!')

      this.displayItemData()
    },
    onPickFile() {
      this.$refs.fileInput.click()
    },
    async onFilePicked(event) {
      const files = event.target.files
      if (files.length > 0) {
        this.image = files[0]
        this.imageFile = URL.createObjectURL(this.image)
      }
    },
  },
  mounted() {
    this.displayItemData()
  },
  components: {
    NavBar,
  },
}
</script>

<style scoped>
.add-items-container {
  height: 100%;
  width: 100vw;
  justify-content: center;
  display: flex;
  background-color: #f8f4ed;
}

.add-items-table-container {
  height: 350px;
  overflow-y: auto;
}

#itemTable {
  width: 100%;
}

table {
  width: 100%;
  border-collapse: collapse;
}

th,
td {
  padding: 8px;
  border-bottom: 1px solid #ddd;
  text-align: left;
}

th {
  color: green;
}

tr {
  border: 1px solid black;
}

.add-items-uploaded-image {
  width: 100px;
  height: 100px;
}
</style>
