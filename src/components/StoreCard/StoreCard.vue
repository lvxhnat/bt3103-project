<template>
  <v-card class="store-card" @click="navigateToStorePage">
    <v-img :src="imageURL" height="200" margin-top="0"></v-img>
    <v-card-title class="store-title">{{ title }}</v-card-title>
    <v-card-text>{{ place }}</v-card-text>
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
  </v-card>
</template>

<script>
import { useRouter } from 'vue-router'

export default {
  name: 'StoreCard',
  setup(props) {
    const router = useRouter()
    const navigateToStorePage = () => {
      const sanitizedTitle = props.title.toLowerCase().replace(/[^\w\s]/gi, '') // Removes all punctuation and non-word characters
      router.push({
        name: 'storepage',
        params: {
          id: sanitizedTitle,
        },
        query: {
          name: props.title,
        },
      })
    }
    return {
      navigateToStorePage,
    }
  },
  props: {
    title: String,
    place: String,
    imageURL: {
      type: String,
      default: '',
    },
    numStars: {
      type: Number,
      required: true,
    },
  },
  data() {
    return {
      rating: this.numStars,
    }
  },
  computed: {
    stars() {
      let starsArray = []
      for (let i = 1; i <= 5; i++) {
        starsArray.push({ id: i, filled: i <= this.numStars })
      }
      return starsArray
    },
    getImageURL() {
      return this.imageURL;
    },
  },
}
</script>

<style scoped>
@import './style.css';
</style>
