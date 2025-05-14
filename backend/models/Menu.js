const mongoose = require('mongoose');

const menuItemSchema = new mongoose.Schema({
  name: String,
  price: Number
});

const menuCategorySchema = new mongoose.Schema({
  category: String,
  priceNote: String, // e.g., "@ Rs. 299 P.P"
  items: [menuItemSchema]
});

const Menu = mongoose.model('Menu', menuCategorySchema);
module.exports = Menu;
