//require package
const mongoose = require("mongoose");

// Define the order schema
const orderSchema = mongoose.Schema({
  createAt: {
    type: Date,
    default: Date.now(),
  },
  productName: {
    type:String,
    required:true,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
});

//create collection in database its name orders (Order)
let Order = mongoose.model("Order", orderSchema);

module.exports = Order;
