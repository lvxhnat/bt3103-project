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
      <v-btn
        size="small"
        rounded="xl"
        variant="outlined"
        color="rgb(29, 41, 57)"
        dark
        >Show All</v-btn
      >
      <div class="establishments-wrapper">
        <Establishment
          :itemRating="4"
          @update:itemRating="updateRating"
          title="The Baker's Dozen"
          place="Raffles Place)"
          imageURL="bakers-dozen.png"
        />
        <Establishment
          :itemRating="4.6"
          @update:itemRating="updateRating"
          title="GreenMart"
          place="Clementi Mall"
          imageURL="greenmart.png"
        />
        <Establishment
          :itemRating="4.2"
          @update:itemRating="updateRating"
          title="Mimi's Pizzeria"
          place="Jurong Point"
          imageURL="mimi-pizzeria.png"
        />
      </div>
    </div>
  </div>
</template>

<script>
import NavBar from '@/components/NavBar'
import Establishment from '@/components/Establishment'

export default {
  name: 'LandingPage',
  components: {
    NavBar,
    Establishment,
  },
  data() {
    return {
      stars: 3, // Initial value for numStars
    }
  },
  methods: {
    updateRating(value) {
      this.itemRating = value // Update the numStars prop in the parent component
    },
  },
}
</script>

<style scoped>
@import './style.css';
</style>
