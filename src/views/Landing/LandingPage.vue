<template>
  <NavBar />
  <div class="landing-container">
    <div class="landing-wrapper base">
      <div class="landing-title">
        <h1>Enjoy having Seconds guilt-free.</h1>
      </div>
    </div>
    <div class="choose-wrapper">
      <h1>Choose from your favourite stores</h1>
      <router-link to="/catalogue" class="show-all-button">
        <v-btn size="small" rounded="xl" variant="outlined" color="rgb(29, 41, 57)" dark>
          Show All
        </v-btn>
      </router-link>

      <div class="StoreCards-wrapper">
        <v-slide-group v-model="selectedBusinessIndex">
          <v-slide-group-item v-for="business in businesses" :key="business.title">
            <StoreCard class="storecard" :numStars="business.numStars" :title="business.title" :place="business.place"
              :imageURL="business.imageURL" />
          </v-slide-group-item>
        </v-slide-group>
      </div>
    </div>
  </div>
</template>

<script>
import NavBar from '@/components/NavBar'
import StoreCard from '@/components/StoreCard'
import { db } from '@/firebaseConfig'
import { getDocs, collection } from 'firebase/firestore'

export default {
  name: 'LandingPage',
  components: {
    NavBar,
    StoreCard,
  },
  data() {
    return {
      businesses: [],
      selectedBusinessIndex: 0 // Initialize the selected business index
    }
  },
  async mounted() {
    await this.fetchAndUpdateData();
  },
  methods: {
    async fetchAndUpdateData() {
      try {
        const querySnapShot = await getDocs(collection(db, 'Account Details'));
        querySnapShot.forEach((doc) => {
          const data = doc.data();
          if (data.store && data.address && data.image) {
            this.businesses.push({
              numStars: '4',
              title: data.store,
              place: data.address,
              imageURL: data.image,
            })
          }
        })
      } catch (error) {
        // const errorCode = error.code
        const errorMessage = error.message;
        alert(errorMessage);
      }
    },
  }
}
</script>

<style scoped>
@import './style.css';
</style>


<!-- <StoreCard
          :numStars="4"
          title="The Baker's Dozen"
          place="Raffles Place"
          imageURL="bakers-dozen.png"
        />
        <StoreCard
          :numStars="5"
          title="GreenMart"
          place="Clementi Mall"
          imageURL="greenmart.png"
        />
        <StoreCard
          :numStars="3"
          title="Mimi's Pizzeria"
          place="Jurong Point"
          imageURL="mimi-pizzeria.png"
        />
        <v-row justify="center" align="center">
          <v-btn
            class="ma-2"
            color="rgb(29, 41, 57)"
            rounded
            variant="outlined"
          >
            <v-icon icon="mdi-chevron-right"></v-icon>
          </v-btn> -->