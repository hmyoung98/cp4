<template>
  <div>
    <div class="wrapper">
      <div class="search">
        <form class="pure-form">
          <i class="fas fa-search"></i><input v-model="searchText" />
        </form>
      </div>
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
  name: 'Home',
  components: {
    CarList
  },
  data() {
    return {
      searchText: '',
    }
  },
  computed: {
    cars() {
      return this.$root.$data.cars.filter(car => car.model.toLowerCase().search(this.searchText.toLowerCase()) >= 0);
    }
  },
}
</script>

<style scoped>
.wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
}

.search {
  border: 1px solid #ccc;
  border-radius: 4px;
  width: 50%;
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

form {
  display: table;
  width: 100%;
}

i {
  display: table-cell;
  padding-left: 10px;
  width: 1px;
}

input {
  display: table-cell;
  font-size: 20px;
  border: none !important;
  box-shadow: none !important;
  width: 100%;
  height: 40px;
}
</style>
