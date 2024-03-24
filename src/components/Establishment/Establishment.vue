<template>
  <v-card class="store-card">
    <v-img :src="getImageURL" height="200" margin-top="0"></v-img>
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
      <!-- <v-rating
        v-model="rating"
        active-color="blue"
        color="orange-lighten-1"
        dense
        size="20"
      ></v-rating> -->
    </v-card-text>

    <!-- <v-rating
        v-model="rating"
        background-color="deep-purple lighten-2"
        color="amber"
        dense
        size="20"
      ></v-rating> -->

    <!--<div class="text-left">
      <v-rating
        v-model="rating"
        active-color="blue"
        color="orange-lighten-1"
        background-color="transparent"
        dense
        size="20"
      ></v-rating>
    </div> -->
  </v-card>
</template>

<script>
export default {
  name: 'StoreCard',
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
      return require(`@/assets/establishments/${this.imageURL}`)
    },
  },
}
</script>

<style scoped>
@import './style.css';
</style>
