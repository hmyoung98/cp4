<template>
<div class="admin">
  <div class="heading">
    <h2>Add a Car!</h2>
  </div>
  <div class="add">
    <div class="form">
      <input v-model="brand" placeholder="Brand">
      <p></p>
      <input v-model="model" placeholder="Model">
      <p></p>
      <input v-model="year" placeholder="Year">
      <p></p>
      <input v-model="price" placeholder="Price (no $ or commas)">
      <p></p>
      <input type="file" name="photo" @change="fileChanged">
      <button @click="upload">Upload</button>
    </div>
    <div class="upload" v-if="addItem">
      <h2>{{addItem.brand}}</h2>
      <h3>{{addItem.model}}</h3>
      <h3>{{addItem.year}}</h3>
      <h2>${{addItem.price}}</h2>
      <img :src="addItem.path" />
    </div>
  </div>
  <div class="heading">
    <h2>Edit/Delete a Car!</h2>
  </div>
  <div class="edit">
    <div class="form">
      <input v-model="findTitle" placeholder="Search">
      <div class="suggestions" v-if="suggestions.length > 0">
        <div class="suggestion" v-for="s in suggestions" :key="s.id" @click = "selectItem(s)">{{s.brand}} {{s.model}}
	</div>
      </div>
    </div>
    <div class="upload" v-if="findItem">
      <input v-model="findItem.brand">
      <p></p>
      <input v-model="findItem.model">
      <p></p>
      <input v-model="findItem.year">
      <p></p>
      <input v-model="findItem.price">
      <p></p>
      <img :src="findItem.path" />
    </div>
    <div class="actions" v-if="findItem">
      <button @click="deleteItem(findItem)">Delete</button>
      <button @click="editItem(findItem)">Edit</button>
    </div>
  </div>
</div>
</template>

<style scoped>
.image h2 {
  font-style: italic;
  font-size: 1em;
}

.heading {
  display: flex;
  margin-bottom: 20px;
  margin-top: 20px;
}

.heading h2 {
  margin-top: 8px;
  margin-left: 10px;
}

.add,
.edit {
  display: flex;
  margin-bottom: 20px;
}

.circle {
  border-radius: 50%;
  width: 18px;
  height: 18px;
  padding: 8px;
  background: #333;
  color: #fff;
  text-align: center
}

/* Form */
input,
textarea,
select,
button {
  font-family: 'Montserrat', sans-serif;
  font-size: 1em;
}

.form {
  margin-right: 50px;
}

/* Uploaded images */
.upload h2 {
  margin: 0px;
}

.upload h3 {
  margin: 0px;
}

.upload img {
  max-width: 300px;
}
</style>

<script>
import axios from 'axios';
export default {
  name: 'Admin',
  data() {
    return {
      brand: "",
      model: "",
      year: null,
      price: null,
      file: null,
      addItem: null,
      items: [],
      findTitle: "",
      findItem: null,
    }
  },
  computed: {
    suggestions() {
      let items = this.items.filter(item => item.model.toLowerCase().startsWith(this.findTitle.toLowerCase()));
      return items.sort((a, b) => a.model > b.model);
    }
  },
  created() {
    this.getItems();
  },
  methods: {
    fileChanged(event) {
      this.file = event.target.files[0]
    },
    async upload() {
      try {
        const formData = new FormData();
        formData.append('photo', this.file, this.file.name)
        let r1 = await axios.post('/api/photos', formData);
        let r2 = await axios.post('/api/items', {
          brand: this.brand,
          model: this.model,
          year: this.year,
          price: this.price,
          path: r1.data.path
        });
        this.addItem = r2.data;
        } catch (error) {
          //console.log(error);
      }
    },
    async getItems() {
      try {
        let response = await axios.get("/api/items");
        this.items = response.data;
        return true;
      } catch (error) {
        //console.log(error);
      }
    },
    selectItem(item) {
      this.findTitle = "";
      this.findItem = item;
    },
    async deleteItem(item) {
      try {
        await axios.delete("/api/items/" + item._id);
        this.findItem = null;
        this.getItems();
        return true;
      } catch (error) {
        //console.log(error);
      }
    },
    async editItem(item) {
      try {
        await axios.put("/api/items/" + item._id, {
          brand: this.findItem.brand,
          model: this.findItem.model,
          year: this.findItem.year,
          price: this.findItem.price,
          path: this.findItem.path,
        });
        this.findItem = null;
        this.getItems();
        return true;
      } catch (error) {
        //console.log(error);
      }
    },
  }
}
</script>
