<template>
  <nav class="navbar">
    <img src="../../assets/logo/logo.png" width="450px" />
    <div class="login-wrapper">
      <button class="login-button">USER LOGIN</button>
      <button class="login-button">BUSINESS LOGIN</button>
    </div>
  </nav>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'NavBar',
})
</script>

<style scoped>
@import './style.css';
</style>
