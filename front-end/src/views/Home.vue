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
    <div class="userCars" v-for="item in items" :key="item.id">
      <div class="info">
        <h1>{{item.brand}}</h1>
        <h2>{{item.model}}</h2>
        <p><em>{{item.year}}</em></p>
      </div>
      <div class="image">
        <img :src="'/images/car-pics/'+item.image+'.jpg'">
      </div>
      <div class="price">
        <h2>${{item.price}}</h2>
        <button class="auto" v-on:click="addToGarage(item)">Add to Garage</button>
      </div>
    </div>
    <div class="footer">
      <a class="repos" href="https://github.com/hmyoung98/cp4">Github Repository</a>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import CarList from "../components/CarList.vue"
export default {
  name: 'Home',
  components: {
    CarList
  },
  data() {
    return {
      searchText: '',
      items: [],
    }
  },
  created() {
    this.getItems();
  },
  methods: {
    async getItems() {
      try {
        let response = await axios.get("/api/items");
	this.items = response.data;
	return true;
      } catch (error) {
        //console.log(error);
      }
    },
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
.userCars {
  margin : 10px;
  margin-top: 50px;
  width: 250px;
}
.userCars img {
  height: 200px;
  width: 250px;
  object-fit: cover;
}
.userCars .image {
  display: flex;
  justify-content: center;
  margin-bottom: 5px;
}
.info {
  background: DF0E46;
  color: whitesmoke;
  display: flex;
  padding: 10px 10px;
  height: 50px;
}
.info h1 {
  color: #000;
  font-size: 16px;
}
.info h2 {
  color: #767676;
  font-size: 14px;
  padding-left: 3px;
  padding-right: 3px;
}
.info p {
  color: #A7A7A7;
  margin: 0px;
  font-size: 10px;
  padding-top: 15px;
}
button {
  height: 50px;
  background: #000;
  color: whitesmoke;
  border:none;
}
.auto {
  margin-left: auto;
}
</style>
