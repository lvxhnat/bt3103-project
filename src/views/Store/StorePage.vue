<template>
  <NavBar />
  <v-app>
    <div class="container">
      <img :src="getImageURL" height="420px" width="100%" />
      <div class="main-content">
        <h1 class="headline">{{ name }}</h1>
        <v-card-text>
          <div class="store-rating">
            <span
              v-for="star in stars"
              :key="star.id"
              class="star"
              :class="{ filled: star.filled }"
              >★</span
            >
          </div>
        </v-card-text>
        <div class="bottom-wrapper">
          <h3>Order for tomorrow 12:00</h3>
        </div>

        <div class="card-wrapper">
          <!-- <ItemCard
          v-for="item in listings"
          :key="item.Item"
          :name="item.Item"
          :price="item.Price"
          :imageURL="item.Image"
        /> -->
          <ItemCard
            key="Butter Crossiant"
            name="Butter Crossiant"
            price="$1 per piece"
            imageURL="bakers-dozen.png"
          />
        </div>
      </div>
    </div>
  </v-app>
</template>

<script>
import NavBar from '@/components/NavBar'
import StoreCard from '@/components/StoreCard'
import ItemCard from '@/components/ItemCard'

import { useRoute } from 'vue-router'
import { computed } from 'vue'
import { getDocs, collection } from 'firebase/firestore'
import { db } from '@/firebaseConfig'

export default {
  name: 'StorePage',
  components: {
    NavBar,
    ItemCard,
    StoreCard,
  },
  data() {
    return {
      listings: [],
    }
  },
  async mounted() {
    this.listings = await this.fetchAndUpdateData(this.name)
  },
  computed: {
    stars() {
      let starsArray = []
      for (let i = 1; i <= 5; i++) {
        starsArray.push({ id: i, filled: i <= 5 })
      }
      return starsArray
    },
  },
  methods: {
    async fetchAndUpdateData(name) {
      try {
        const querySnapshot = await getDocs(collection(db, name))
        const data = []
        querySnapshot.forEach((doc) => {
          data.push(doc.data())
        })
        return data
      } catch (err) {
        console.log(err)
        return []
      }
    },
  },
  setup() {
    const route = useRoute()
    const name = route.query.name

    const getImageURL = computed(() => {
      return require(`@/assets/backgrounds/store-page.png`)
    })

    return {
      name,
      getImageURL,
    }
  },
}
</script>

<style scoped>
@import './style.css';

.store-rating {
  color: #ffd700; /* Star color - gold */
  font-size: 30px;
  margin-top: -20px;
  margin-left: -20px;
}

.star {
  display: inline-block;
  color: #dcdcdc; /* Default star color - unfilled */
}

.star.filled {
  color: #ffd700; /* Filled star color */
}

.bottom-wrapper {
  margin-top: -10px;
  gap: 10px;
}

.card-wrapper {
  padding-top: 20px;
}
</style>
