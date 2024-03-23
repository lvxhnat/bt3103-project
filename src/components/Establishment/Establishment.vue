<template>
  <v-card class="store-card">
    <v-img :src="getImageURL" height="200" margin-top="0"></v-img>
    <v-card-title class="store-title">{{ title }}</v-card-title>
    <v-card-text>{{ place }}</v-card-text>
    <v-card-text>
      <v-rating
        v-model="rating"
        background-color="deep-purple lighten-2"
        color="amber"
        @input="updateRating"
        dense
        size="20"
      ></v-rating>

      <!-- <v-rating
        :value="numStars"
        @input="updateNumStars"
        background-color="transparent"
        color="yellow"
        half-increments
      ></v-rating> -->
    </v-card-text>
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
    itemId: Number,
    itemRating: Number,
  },
  methods: {
    updateRating(value) {
      this.$emit('update:rating', value) // Emitting an event to update the prop in the parent component
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
