<template>
<div>
  <div class="pure-menu pure-menu-horizontal">
    <ul class="pure-menu-list">
      <li class="pure-menu-item"><a @click="select(1960,1980)" href="#" class="pure-menu-link">pre-1980</a></li>
      <li class="pure-menu-item"><a @click="select(1980,1990)" href="#" class="pure-menu-link">1980-1990</a></li>
      <li class="pure-menu-item"><a @click="select(1990,2000)" href="#" class="pure-menu-link">1990-2000</a></li>
      <li class="pure-menu-item"><a @click="select(2000,2010)" href="#" class="pure-menu-link">2000-2010</a></li>
      <li class="pure-menu-item"><a @click="select(2010,3000)" href="#" class="pure-menu-link">2010-present</a></li>
    </ul>
  </div>
  <CarList :cars="cars" />
  <div class="footer">
    <a class="repos" href="https://github.com/hmyoung98/cp3">Github Repository</a>
  </div>
</div>
</template>

<script>
import CarList from "../components/CarList.vue"
export default {
  name: 'Browse',
  components: {
    CarList
  },
  data() {
    return {
      year1: 0,
      year2: 0,
    }
  },
  computed: {
    cars() {
      return this.$root.$data.cars.filter(car => car.year < this.year2 && car.year >= this.year1);
    }
  },
  methods: {
    select(year1,year2) {
      this.year1 = year1;
      this.year2 = year2;
    }
  }
}
</script>

<style scoped>
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
