<template>
  <v-card class="item-card">
    <div class="center-wrapper">
      <h4 class="name">{{ name }}</h4>
    </div>
    <img :src="getImageURL" width="100%" class="img" />
    <div class="bottom-wrapper center-wrapper">
      <h4 class="price">{{ price }}</h4>
      <button>Add to Cart</button>
    </div>
  </v-card>
</template>

<script>
export default {
  name: 'ItemCard',
  setup(props) {},
  props: {
    name: String,
    price: String,
    imageURL: {
      type: String,
      default: '',
    },
  },
  computed: {
    getImageURL() {
      return require('@/assets/store/item1.png')
    },
  },
}
</script>

<style scoped>
.price {
  color: white;
}
.name {
  font-weight: bold;
  padding: 5px;
  padding-left: 10px;
}
.item-card {
  width: 250px;
  background-color: #edb451;
  gap: 0;
  min-height: 0;
}
.img {
  border-radius: 0;
  padding: 0;
}
.center-wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}
.bottom-wrapper {
  height: 100%;
  margin-top: -10px;
  background-color: #118951;
  padding: 10px;
}
button {
  background-color: white;
  padding: 2px 10px;
}
</style>
