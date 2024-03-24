<template>
  <div class="store-card">
    <img :src="getImageURL" />
    <div class="store-details">
      <h2 class="store-title">{{ title }}</h2>
      <div class="store-rating">
        <span
          v-for="star in stars"
          :key="star.id"
          class="star"
          :class="{ filled: star.filled }"
          >★</span
        >
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'StoreCard',
  props: {
    title: String,
    imageURL: {
      type: String,
      default: '',
    },
    numStars: {
      type: Number,
      required: true,
    },
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
      return require(`@/assets/establishments/${this.imageURL}`)
    },
  },
}
</script>

<style scoped>
@import './style.css';
</style>
