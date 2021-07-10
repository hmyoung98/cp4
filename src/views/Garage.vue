<template>
<div>
  <h1 class="garage">Your Garage</h1>
  <h3 v-if="this.$root.$data.garageSize===0" class="empty-garage">Your garage has no cars in it!</h3>
  <div v-else class="garage-container">
    <div class="total-cost">
      <h3>Total Cost: ${{this.$root.$data.totalCost}}</h3>
    </div>
    <div class="garage-item" v-for="item in garage" :key="item.vin">
      <img v-bind:src="'/images/car-pics/' + item.image + '.jpg'"/>
      <p>{{item.year}} {{item.make}} {{item.model}} - ${{item.price}}</p>
      <button class="remove-button" v-on:click='removeItem(item)'>Remove</button>
    </div>
  </div>
  <div class="footer">
    <a class="repos" href="https://github.com/hmyoung98/cp3">Github Repository</a>
  </div>
</div>
</template>

<script>
export default {
  name: 'Garage',
  methods: {
    removeItem(item) {
      let index = this.$root.$data.garage.indexOf(item);
      this.$root.$data.garage.splice(index, 1);
      this.$root.$data.garageSize -= 1;
      this.$root.$data.totalCost -= item.price;
    }

  },
  computed: {
    garage() {
      return this.$root.$data.garage;
    },
  },
}
</script>

<style scoped>
  .garage-item img {
    height: 200px;
    width: 250px;
    object-fit: cover;
  }
  .remove-button {
  margin-bottom: 10px;
  }
  .footer {
    height: 100px;
    padding-top: 40px;
    text-align: center;
  }
  .repos {
    text-decoration: none;
    color: gray;
  }
  .repos:hover {
    text-decoration: none;
    color: black;
  }
</style>
