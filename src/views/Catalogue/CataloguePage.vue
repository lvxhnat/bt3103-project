<template>
  <NavBar />
  <div class="cataloge-container">
    <div class="catalogue-wrapper">
      <div class="catalogue-header">
        <h1>Choose from your favourite stores</h1>
      </div>

      <div class="catalogue-storeCards">
        <div class="catalogue-storeCards-wrapper">
          <StoreCard v-for="business in businesses" :key="business.title" :numStars="business.numStars"
            :title="business.title" :place="business.place" :imageURL="business.imageURL" />
        </div>
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
  name: 'CataloguePage',
  components: {
    NavBar,
    StoreCard,
  },
  data() {
    return {
      businesses: []
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
.catalogue-header {
  padding-top: 75px;
  margin-left: 25px;
}

.catalogue-storeCards-wrapper {
  display: flex;
  gap: 25px;
  padding-top: 25px;
}

.catalogue-container {
  height: 100%;
  width: 100vw;
}

.catalogue-wrapper {
  background-color: #f8f4ed;
  padding: 20px;
}

.catalogue-storeCards {
  margin-left: 25px;
}
</style>
