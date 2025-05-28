const mongoose = require('mongoose');

const menuItemSchema = new mongoose.Schema({
  _id: false, // Disable automatic _id generation for subdocuments
  name: {
    type: String,
    required: true,
    trim: true
  },
  price: {
    type: Number,
    required: true,
    min: 0
  }
}, { _id: false }); // This ensures no _id is created for items

const menuCategorySchema = new mongoose.Schema({
  category: {
    type: String,
    required: true,
    trim: true
  },
  priceNote: {
    type: String,
    trim: true
  },
  items: [menuItemSchema]
}, { timestamps: true });

const Menu = mongoose.model('Menu', menuCategorySchema);
module.exports = Menu;