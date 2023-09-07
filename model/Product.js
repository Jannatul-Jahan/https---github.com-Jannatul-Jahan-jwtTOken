const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  title: {
    type: String,
  },
  description: {
    type: String,
  },
  price: {
    type: Number,
  },
  // rating: {
  //   type: Number,
  // },
  // discountPercentage: {
  //   type: Number,
  // },
  // stock: {
  //   type: Number,
  // },
  // brand: {
  //   type: String,
  // },
  // category: {
  //   type: String,
  // },
  // thumbnail: {
  //   type: String,
  // },
});

const Product = mongoose.model("Newproduct", productSchema);
module.exports = Product;
