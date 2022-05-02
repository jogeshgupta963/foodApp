const mongoose = require('mongoose');

const planSchema = new mongoose.Schema({

    name:{
        type:String,
        required:true,
        unique:true,
        maxlength:[20,'plan name shouldnt exceed more than 20 characters ']
    },
    duration:{
        type:Number,
        required:[true,"price not entered"]
    },
    price:{
        type:Number,
        required:[true,"assign a price"]
    },
    ratings:{
        type:Number
    },
    discount:{
        type:Number,
        default:0,
        // validate: ()=>  this.discount <= 100  
    }
    
})
planSchema.set('timestamps',true);

const Plan = mongoose.model('plan',planSchema)

module.exports = Plan;