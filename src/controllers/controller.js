const express = require("express");
const app = express();
const RestaurantModel = require("../models/model");
const {orderModel} = require("../models/model");


// To add the new restaurants
const createRestaurant = async (req, res) => {
  try {
    const newRestaurant = new RestaurantModel(req.body);
    const savedRestaurant = await newRestaurant.save();
    res.status(201).json(savedRestaurant);
  } catch (error) {
      res.status(400).json({ message: error.message});
    }
};


// To display the restaurant details
const getRestaurant = async (req, res) => {
  try {
    if (req.params.id) {
      // Fetch a specific restaurant based on rest_id parameter
      const restaurant = await RestaurantModel.findOne({
        rest_id: req.params.id,
      });

      if (!restaurant) {
        return res.status(404).json({ error: "Restaurant not found" });
      }
      res.json(restaurant);
    } else {
      // Fetch all restaurants if no id is provided
      const restaurants = await RestaurantModel.find({});
      res.json(restaurants);
    }
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};


// display the restaurant by city
const getRestCity = async (req, res) => {
  try {
    const paramCity = req.params.city1.toLowerCase();
    const paramMenu = req.params.menu;

    const restaurants = await RestaurantModel.find(
      { city: paramCity } && { food_item: paramMenu }
    );

    if (restaurants.length > 0) {
      res.status(200).json({ restaurants });
    } else {
      // If no restaurants found in the specified city
      // res.status(404).json({ message: 'No restaurants found in the specified city' });
      res.status(404).json({message: `No restaurants found with the menu: ${paramMenu} in ${paramCity}`});
    }
  } catch (error) {
    console.error("Error fetching restaurants by city:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};




//-----------------------------------------------//
//     Order Collection Details API
//----------------------------------------------//

// to add the new order
const createOrder = async (req, res) => {
  try {
    const newOrder = new orderModel(req.body);
    const savedRestaurant = await newOrder.save();
    res.status(201).json(savedRestaurant);
  } catch (error) {
      res.status(400).json({ message: error.message});
    }
};


// to retrieve the all data which is stored at the backend.
const orderDisplay = async (req, res) => {
  try {

    const display = await orderModel.find({});
    res.json(display);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const displayByMenu = async(req, res) => {
  try{
    const menu1 = req.params.menu ? req.params.menu : {};
    const rel = await orderModel.findOne(menu1);
    res.json(rel);
  }catch(error){
    res.status(400).json({message: error.message});
  }
}

// to delete the data by using particular id
const deleteOrder = async (req, res) => {
  try {
    const deleteId = req.params.orId;
    
    const deleteOrder = await orderModel.findOneAndDelete({ user_id: deleteId });

    if (!deleteOrder) {
      return res.status(404).json({ message: "Order not found" });
    }

    res.status(200).json({ message: "Order deleted successfully" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};


// To update the data from the orderUpdate like quantity and price
const updateOrder = async (req, res) => {
  try {
    const updateId = req.params.uId;
    const { food_item, quantity } = req.body;

    const updatedData = await orderModel.findOneAndUpdate(
      { user_id: updateId },
      { food_item, quantity },
      { new: true }
    );

    if (!updatedData) {
      return res.status(404).json({ message: "Order not found" });
    }

    res.redirect("/");
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// const addToCart = async (req, res) => {
//   try {
//     const {rest_id} = req.body;
//     const cId = req.params.cartId;

//     // Check if the restaurant exists
//     const restaurant = await RestaurantModel.findOne({ rest_id:cId });

//     if (!restaurant) {
//       return res.status(404).json({ error: 'Restaurant not found' });
//     }

//     // Create a new item in the user's cart
//     const newItem = new orderModel({
//       rest_id: ReataurantModel.rest_id,
//       rest_name: RestaurantModel.rest_name,
//       food_item: RestaurantModel.food_item,
//       quantity:RestaurantModel.quantity,
//       price: RestaurantModel.price
//     });

//     await newItem.save();
//     req.cartItemMessage = 'Item added to the cart successfully';
//     // next();
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: 'Internal Server Error' });
//   }
// };

module.exports = {
  createRestaurant,
  getRestaurant,
  getRestCity,
  createOrder,
  deleteOrder,
  orderDisplay,
  updateOrder,
  displayByMenu,
  // addToCart
};
