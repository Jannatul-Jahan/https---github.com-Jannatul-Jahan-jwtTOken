const mongoose = require("mongoose");

const TransactionSchema = new mongoose.Schema({
  user: {
    type: mongoose.Types.ObjectId,
    ref: 'User',
    required: true,
    unique: true,
  },
  products: [{
    product: {
      type: mongoose.Types.ObjectId,
      ref: 'Product',
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
    },
  }],
  total: {
    type: Number,
  },
});

const Transaction = mongoose.model("Transaction", TransactionSchema);
module.exports = Transaction;

// const mongoose = require("mongoose");

// const TansactionSchema = new mongoose.Schema({
//   user: {
//     type: mongoose.Types.ObjectId,
//     ref: 'User',
//     required: true,
//   },
//   products: [{
//     type: mongoose.Types.ObjectId,
//     ref: 'Product',
//     required: true,
//   }],
//   total: {
//     type: Number,
//   },
// });

// const Transaction = mongoose.model("Transaction", TansactionSchema);
// module.exports = Transaction;

