<template>
  <v-card class="item-card">
    <div class="center-wrapper">
      <h4 class="name">{{ name }}</h4>
    </div>
    <img :src="imageURL" width="100%" class="img" />
    <div class="bottom-wrapper center-wrapper">
      <h4 class="price">{{ priceLabel }}</h4>
      <button @click="addItemToCart">Add to Cart</button>
    </div>
  </v-card>
</template>

<script>
import { getAuth, onAuthStateChanged } from 'firebase/auth'
import { db } from '/src/firebaseConfig.js'
import { doc, setDoc, } from 'firebase/firestore'

export default {
  name: 'ItemCard',
  setup(props) { },
  props: {
    name: String,
    price: Number,
    priceLabel: String,
    imageURL: {
      type: String,
      default: '',
    },
    store: String,
  },
  data() {
    return {
      useremail: '',
    }
  },
  // computed: {
  //   getImageURL() {
  //     // return require('/Users/lohyikuang/Downloads/school_semesters/2024 Y3 SEMESTER 2/BT 3103/project/bt3103-project/src/assets/store/item1.png')
  //     return require('@/assets/store/item1.png');
  //   },
  // },
  methods: {
    async addItemToCart() {
      try {
        onAuthStateChanged(getAuth(), async (user) => {
          if (user) {
            this.useremail = user.email;
            const itemRef = doc(db, this.useremail, this.name + ', ' + this.store);
            await setDoc(itemRef, {
              store: this.store,
              name: this.name,
              price: this.price,
              quantity: 1,
              image: this.imageURL
            })
            alert(this.name + ' has been added to your cart!')
          } else {
            this.$router.push({ path: '/login/user' })
          }
        })
      } catch (error) {
        alert(error.message)
      }
    }
  }
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
  min-height: 0;
}

.img {
  border-radius: 0;
  padding: 0;
}

.center-wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}

.bottom-wrapper {
  height: 100%;
  margin-top: -10px;
  background-color: #118951;
  padding: 10px;
}

button {
  background-color: white;
  padding: 2px 10px;
}
</style>
