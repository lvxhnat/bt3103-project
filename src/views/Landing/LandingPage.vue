<template>
  <div class="landing-container">
    <NavBar />
    <div class="landing-wrapper base">
      <div class="landing-title">
        <h1>Enjoy having Seconds Guilt Free</h1>
      </div>
    </div>
    <div class="choose-wrapper">
      <h1>Choose from your favourite stores</h1>
      <button class="showall-button">Show All</button>
      <div class="establishments-wrapper">
        <Establishment
          title="The Baker's Dozen (Raffles Place)"
          imageURL="bakers-dozen.png"
          :numStars="5"
        />
        <Establishment
          title="GreenMart (Clementi Mall)"
          imageURL="bakers-dozen.png"
          :numStars="4"
        />
        <Establishment
          title="Mimi's Pizzeria (Jurong Point)"
          imageURL="bakers-dozen.png"
          :numStars="4"
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import NavBar from '@/components/NavBar'
import Establishment from '@/components/Establishment'

export default {
  name: 'LandingPage',
  components: {
    NavBar,
    Establishment,
  },
}
</script>

<style scoped>
@import './style.css';
</style>
