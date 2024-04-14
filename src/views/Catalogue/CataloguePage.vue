<template>
    <NavBar />
    <div class="landing-container">

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
  