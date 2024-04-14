<template>
  <NavBar />
  <div class="landing-container">
    <div class="landing-wrapper base">
      <div class="landing-title">
        <h1>Enjoy having Seconds guilt-free.</h1>
      </div>
    </div>
    <div class="choose-wrapper">
      <AnalyticsChart />
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
          :numStars="4"
          title="The Baker's Dozen"
          place="Raffles Place"
          imageURL="bakers-dozen.png"
        />
        <Establishment
          :numStars="5"
          title="GreenMart"
          place="Clementi Mall"
          imageURL="greenmart.png"
        />
        <Establishment
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
          </v-btn>
        </v-row>
      </div>
    </div>
  </div>
</template>

<script>
import NavBar from '@/components/NavBar'
import Establishment from '@/components/Establishment'
import AnalyticsChart from '@/components/AnalyticsChart'

export default {
  name: 'LandingPage',
  components: {
    NavBar,
    Establishment,
    AnalyticsChart,
  },
}
</script>

<style scoped>
@import './style.css';
</style>
