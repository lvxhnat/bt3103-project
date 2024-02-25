<template>
  <div class="login-container">
    <div class="login-background">
      <div class="login-content">
        <h1 class="title">SecondServings</h1>
        <button class="login-button user-login">USER LOGIN</button>
        <button class="login-button business-login">BUSINESS LOGIN</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'LoginPage'
}
</script>

<style scoped>
.login-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  width: 100vw;
  font-family: 'Arial', sans-serif;
}

.login-background {
  width: 100%;
  height: 100%;
  background-image: url('../assets/backgrounds/login.png');
  background-size: cover;
  background-position: center;
  display: flex;
  justify-content: center;
  align-items: center;
}

.login-content {
  text-align: center;
  color: white;
}

.title {
  font-size: 4em;
  margin-bottom: 1em;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
}

.login-button {
  padding: 1em 2em;
  margin: 0.5em;
  font-size: 1em;
  cursor: pointer;
  border: none;
  transition: background-color 0.3s ease;
}

.user-login {
  background-color: rgba(255, 255, 255, 0.3);
}

.user-login:hover {
  background-color: rgba(255, 255, 255, 0.5);
}

.business-login {
  background-color: rgba(0, 0, 0, 0.3);
}

.business-login:hover {
  background-color: rgba(0, 0, 0, 0.5);
}
</style>
