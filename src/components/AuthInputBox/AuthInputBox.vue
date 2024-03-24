<template>
  <div class="login-page-wrapper">
    <img :src="getImageURL" width="125px" />
    <h1 class="login-title">{{ title }}</h1>
    <div class="input-wrapper">
      <form @submit.prevent="login">
        <div class="input-group">
          <label class="label">Email</label>
          <input
            type="email"
            id="email"
            v-model="client.email"
            placeholder="Enter Email"
            required
          />
        </div>
        <div class="input-group">
          <label class="label">Password</label>
          <input
            type="password"
            id="password"
            v-model="client.password"
            placeholder="Enter Password"
            required
          />
        </div>
        <div class="form-button">
          <button type="submit" class="login-button">{{ buttonText }}</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import styles from './style.css'
export default {
  name: 'AuthInputBox',
  props: {
    title: String,
    buttonText: String,
    imageURL: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      client: {
        email: '',
        password: '',
      },
    }
  },
  computed: {
    getImageURL() {
      return require(`@/assets/auth/${this.imageURL}`)
    },
  },
}
</script>

<style scoped></style>
