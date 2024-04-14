<template>
  <div>
    <h3>Test</h3>
    <div v-if="items && Object.keys(items).length">
      <ul>
        <li v-for="(item, index) in items" :key="index">
          {{ item.name }} - {{ item.amount }}
        </li>
      </ul>
    </div>
    <div v-else>
      <p>No data available or loading...</p>
    </div>
  </div>
</template>

<script>
import { auth, db } from '../../firebaseConfig'
import { collection, getDocs } from 'firebase/firestore'

export default {
  name: 'AnalyticsChart',
  data() {
    return {
      items: [],
      user: null,
    }
  },
  created() {
    auth.onAuthStateChanged((user) => {
      if (user) {
        this.user = user
        this.fetchData(user.email)
      } else {
        this.user = null
        this.items = []
      }
    })
  },
  methods: {
    async fetchData(email) {
      const query = await getDocs(collection(db, 'Top Up'))
      this.items = query.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }))
    },
  },
}
</script>
