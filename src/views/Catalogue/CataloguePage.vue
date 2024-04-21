<template>
  <NavBar />
  <div class="landing-container">
    <div class="choose-wrapper">
      <div class="header">
        <h1>Choose from your favourite stores</h1>
      </div>

      <div class="establishments">
        <div class="establishments-wrapper">
          <Establishment v-for="business in businesses" :key="business.title" :numStars="business.numStars"
            :title="business.title" :place="business.place" :imageURL="business.imageURL" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import NavBar from '@/components/NavBar'
import Establishment from '@/components/Establishment'

export default {
  name: 'CataloguePage',
  components: {
    NavBar,
    Establishment,
  },
  data() {
    return {
      businesses: [
        { numStars: '4', title: "The Baker's Dozen", place: 'Raffles Place', imageURL: 'bakers-dozen.png' },
        { numStars: '5', title: "GreenMart", place: 'Clementi Mall', imageURL: 'greenmart.png' },
        { numStars: '3', title: "Mimi's Pizzeria", place: 'Jurong Point', imageURL: 'mimi-pizzeria.png' },
        { numStars: '5', title: "SweetShakes", place: 'Clementi Mall', imageURL: 'sweetshakes.png' },
        { numStars: '4', title: "The Big Stack", place: 'Westgate', imageURL: 'the-big-stack.png' },
        { numStars: '4', title: "Filly's Taco", place: 'City Square Mall', imageURL: 'fillys-taco.png' },
        { numStars: '5', title: "The Fruit Stop", place: 'NEX Mall', imageURL: 'the-fruit-stop.png' },
        { numStars: '5', title: "JP Bakery", place: 'Jurong Point', imageURL: 'jp-bakery.png' },
      ]
    }
  }
}
</script>

<style scoped>
@import './style.css';
</style>