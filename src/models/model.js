const mongoose = require("mongoose");

// Mongoose Connection
mongoose.connect("mongodb://127.0.0.1:27017/zomato_api")
.then(()=>{
    console.log("connection successfull");
})
.catch((e)=>{
    console.log(e);
})

const restaurantSchema = new mongoose.Schema({
  rest_id: {
    type: Number,
    required: true
  },

  rest_name: {
    type: String,
    required: true
  },

  food_item: {
    type: String,
    required: true
  },

  description: {
    type: String,
    required: true
  },

  price: {
    type: Number,
    required: true
  },

  quantity: {
    type: Number,
    required: true
  },

  city: {
    type: String,
    required: true
  },

  availability: {
    type: String,
    required: true
  },
});

const orderSchema = new mongoose.Schema({
  user_id: {
    type: Number,
    required: true
  },

  username: {
    type: String,
    default:"Vishal C",
    required: true,
  },

  rest_id: {
    type: Number,
    required: true
  },

  rest_name: {
    type: String,
    required: true
  },

  food_item: {
    type: String,
    required: true
  },
  
  quantity: {
    type: Number,
    required: true
  },

  price: {
    type: Number,
    required: true
  },

  city: {
    type: String,
    required: true
  },

  createdAt: {
    type: Date,
    default: Date.now
  }
});

const RestaurantModel = mongoose.model("Restaurant", restaurantSchema);
const orderModel = mongoose.model("Order", orderSchema);

module.exports = { RestaurantModel, orderModel };
