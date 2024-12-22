const mongoose = require('mongoose');
const FoodModel = new mongoose.Schema({
    Name:{
        type:String
    },
    Price:{
        type:Number
    }
})
Food = mongoose.model('FoodData',FoodModel);
module.exports=Food;