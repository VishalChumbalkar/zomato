const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const routes = require('./src/routers/router');
// const RestaurantModel = require('./src/models/model');


// Middleware to parse JSON requests
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());


// Add more routes as needed.
app.use('/', routes);


const PORT = 3000;
app.listen(PORT, ()=>{
    console.log(`Server is running on http://localhost:${PORT}`);
})