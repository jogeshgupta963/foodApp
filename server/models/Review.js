const mongoose = require('mongoose');


const reviewSchema = new mongoose.Schema({
    review:{
        type:String,
        required:true,
    },
    ratings:{
        type:Number,
        min:1,
        max:5,
        required:true
    },
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'user',
        require:true
    },
    plan:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'plan',
        require:true
    }
})

reviewSchema.set('timestamps',true)


// reviewSchema.methods.populate('/^find',function(next){
//     this.populate({
//         path:'user',
//         select:'name email profileImage '
//     }).populate({
//         path:'plan',
//         select:'name',         
//     })
// })

const Review = mongoose.model('review',reviewSchema)

module.exports = Review;