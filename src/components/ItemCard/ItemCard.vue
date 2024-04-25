<template>
  <v-card class="item-card">
    <div class="center-wrapper">
      <h4 class="name">{{ name }}</h4>
    </div>
    <div class="img">
      <img :src="imageURL" width="100%" height="100%" />
    </div>
    <div class="bottom-wrapper center-wrapper">
      <h4 class="price">Price: ${{ price }}</h4>
      <h4 class="price">Quantity Available: {{ quantity }}pcs</h4>
      <button @click="addItemToCart">Add to Cart</button>
    </div>
  </v-card>
</template>

<script>
import { getAuth, onAuthStateChanged } from 'firebase/auth'
import { db } from '/src/firebaseConfig.js'
import { doc, setDoc, query, collection, where, getDocs, getDoc } from 'firebase/firestore'

export default {
  name: 'ItemCard',
  setup(props) { },
  props: {
    name: String,
    price: Number,
    quantity: String,
    imageURL: {
      type: String,
      default: '',
    },
    store: String,
  },
  data() {
    return {
      useremail: '',
      user: '',
    }
  },
  methods: {
    async addItemToCart() {
      try {
        const user = getAuth().currentUser
        if (user) {
          this.useremail = user.email
          const itemRef = doc(db, this.useremail, this.name + ', ' + this.store)

          const storeRef = doc(db, this.store, this.name);
          const storeDoc = await getDoc(storeRef);
          const availableQuantity = storeDoc.data().quantity;

          const businessQuery = query(
              collection(db, 'businesses'),
              where('email', '==', this.useremail)
          )

          const businessSnapshot = await getDocs(businessQuery)
          if (businessSnapshot.empty) {
            await setDoc(itemRef, {
            store: this.store,
            name: this.name,
            price: this.price,
            quantity: 1,
            image: this.imageURL,
            })

            if (availableQuantity >= 1) {
              await setDoc(itemRef, {
              store: this.store,
              name: this.name,
              price: this.price,
              quantity: 1,
              image: this.imageURL
            });
          
            alert(this.name + ' has been added to your cart!')

            } else {
              alert("Item is currently not available!")
            }
          
          } else {
            alert('Unable to add item on a business account!')
          }
        } else {
          alert('Please log in to add item to your cart!')
          this.$router.push({ path: '/login/user' })
        }
      } catch (error) {
        alert(error.message)
      }
    },
  },
}
</script>

<style scoped>
.price {
  color: white;
}

.name {
  font-weight: bold;
  padding: 5px;
  padding-left: 10px;
}

.item-card {
  width: 250px;
  background-color: #edb451;
  gap: 0;
}

.img {
  border-radius: 0;
  padding: 0;
  height: 200px;
}

.center-wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}

.bottom-wrapper {
  background-color: #118951;
  padding: 10px;
}

button {
  background-color: white;
  padding: 2px 10px;
}
</style>
