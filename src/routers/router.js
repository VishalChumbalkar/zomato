const express = require('express');
const router = express.Router();
const controller = require('../controllers/controller');

// restaurant routes
router.post('/addrestaurants', controller.createRestaurant);
router.get('/getrest', controller.getRestaurant);
// router.get('/getrest/:id', controller.getRestaurant);
// router.get('/getrest/:city1/', controller.getRestCity);
router.get('/getrest/:city1/:menu', controller.getRestCity);


// Order cart routes
router.get('/', controller.orderDisplay);
router.get('/food/:menu', controller.displayByMenu);
router.post('/addOrder', controller.createOrder);
// router.post('/addToCart/:cartId', controller.addToCart);
router.delete('/deleteOrder/:orId', controller.deleteOrder);
router.put('/updateOrder/:uId', controller.updateOrder);
module.exports = router;

