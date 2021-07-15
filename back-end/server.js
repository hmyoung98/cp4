const express = require('express');
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));

const mongoose = require('mongoose');

// connect to the database
mongoose.connect('mongodb://localhost:27017/cars', {
  useNewUrlParser: true
});

// configure multer so it uploads to '../front-end/public/images'
const multer = require('multer')
const upload = multer({
  dest: '../front-end/public/images',
  limits: {
    fileSize: 10000000
  }
});

// schema for cars on the home screen
const itemSchema = new mongoose.Schema({
  brand: String,
  model: String,
  year: {type: Number, min: 1960, max: 3000 },
  price: {type: Number, min: 200, max: 1000000 },
});

// model for cars on the home screen
const Item = mongoose.model('Item', itemSchema);

// upload a photo.
app.post('/api/photos', upload.single('photo'), async (req, res) => {
  if (!req.file) {
    return res.sendStatus(400);
  }
  res.send({
    path: "/images/" + req.file.filename
  });
});

// create a new car item
app.post('/api/items', async (req, res) => {
  const item = new Item({
    brand: req.body.brand,
    model: req.body.model,
    year: req.body.year,
    price: req.body.price,
  });
  try {
    await item.save();
    res.send(item);
  } catch (error) {
    res.sendStatus(500);
  }
});

// Get a list of all cars in inventory
app.get('/api/items', async (req, res) => {
  try {
    let items = await Item.find();
    res.send(items);
  } catch (error) {
    res.sendStatus(500);
  }
});

// Delete a car from the inventory
app.delete('/api/items/:id', async (req, res) => {
  try {
    await Item.deleteOne({_id: req.params.id});
    res.sendStatus(200);
  } catch (error) {
    res.sendStatus(500);
  }
});

// Edit a car's information in the inventory
app.put('/api/items/:id', async (req, res) => {
  try {
    let item = await Item.findOne({_id: req.params.id});
    item.brand = req.body.brand;
    item.model = req.body.model;
    item.year = req.body.year;
    item.price = req.body.price;
    await item.save();
    res.send(item);
  } catch (error) {
    res.sendStatus(500);
  }
});

app.listen(3000, () => console.log('Server listening on port 3000!'));
