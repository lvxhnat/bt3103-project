<template>
    <NavBar />
    <div class="landing-container">
    <div class="choose-wrapper">
        <div class = "header">
            <h1>Choose from your favourite stores</h1>
        </div>
        
        <div class = "establishments">
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

        <Establishment
          :numStars="5"
          title="SweetShakes"
          place="Clementi Mall"
          imageURL="sweetshakes.png"
        />

        <Establishment
          :numStars="4"
          title="The Big Stack"
          place="Westgate"
          imageURL="the-big-stack.png"
        />

        <Establishment
          :numStars="4"
          title="Filly's Taco"
          place="City Square Mall"
          imageURL="fillys-taco.png"
        />

        <Establishment
          :numStars="5"
          title="The Fruit Stop"
          place="NEX Mall"
          imageURL="the-fruit-stop.png"
        />

        <Establishment
          :numStars="5"
          title="JP Bakery"
          place="Jurong Point"
          imageURL="jp-bakery.png"
        />
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
}
</script>
  
<style scoped>
@import './style.css';
</style>
  