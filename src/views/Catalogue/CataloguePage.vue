<template>
  <NavBar />
  <div class="catalogue-container">
    <div class="catalogue-wrapper">
      <div class="header">
        <h1>Choose from your favourite stores</h1>
      </div>

      <div class="StoreCards">
        <div class="catalogue-storeCards-wrapper">
          <StoreCard
            v-for="business in businesses"
            :key="business.title"
            :numStars="business.numStars"
            :title="business.title"
            :place="business.place"
            :imageURL="business.imageURL"
          />
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
      businesses: [],
    }
  },
  async mounted() {
    await this.fetchAndUpdateData()
  },
  methods: {
    async fetchAndUpdateData() {
      try {
        const querySnapShot = await getDocs(collection(db, 'Account Details'))
        querySnapShot.forEach((doc) => {
          const data = doc.data()
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
        const errorMessage = error.message
        alert(errorMessage)
      }
    },
  },
}
</script>

<style scoped>
h1 {
  color: #118951;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}

.header {
  padding-top: 50px;
  margin-left: 25px;
}

.catalogue-storeCards-wrapper {
  display: flex;
  gap: 25px;
  padding-top: 25px;
  flex-wrap: wrap;
}

.catalogue-container {
  height: 100%;
  width: 100vw;
  padding: 20px;
}

.catalogue-wrapper {
  background-color: #f8f4ed;
  padding: 20px;
}

.StoreCards {
  margin-left: 25px;
}
</style>
