const Review  =require('../models/Review')
const Plan  =require('../models/Plan')


//@route /
//@desc GET to get all reviews
//@access Private

async function getAllReviews(req,res){

    try{
    const reviews = await Review.find().populate({
        path:'user',
        select:'name email profileImage '
    }).populate({
        path:'plan',
        select:'name',         
    });;
    if(!reviews) res.status(400).json("reviews not found");
    res.status(200).json(reviews) 

    } catch (err) {
        res.status(500).json(err.message)
    }
}

//@route /top3reviews
//@desc GET to get top3 reviews
//@access Public 

async function getTopThreeReviews(req,res){

    try {
        const reviews = await Review.find().sort({
            ratings:-1
        }).limit(3);

        res.json(reviews);
    } catch (err) {
        res.status(500).json(err.message)
    }
}


//@route /:id
//@desc GET to get a reviews
//@access Public 
async function getReview(req,res){
    try {
        const {id} = req.params;
        const review = await Review.findById(id).populate({
            path:'user',
            select:'name email profileImage '
        }).populate({
            path:'plan',
            select:'name',         
        });

        if(!review) return res.status(400).json("not found")

        res.status(200).json(review);

    } catch (err) {
        res.status(500).json(err.message)
    }
}

async function createReview(req,res){
    try{
         const {id} = req.params
         let plan = await Plan.findById(id);
         let review = new Review({
             ...req.body,
             user:req.user._id,
             plan:plan._id
         });
         await review.save();
         plan.ratings = (plan.ratings + req.body.ratings)/2;
         await plan.save();
         res.json("created review")
    }
    catch(err){
        res.status(500).json(err.message);
    }
}


async function updateReview(req,res){
    try {
        let id = req.params.id;
        let review = await Review.findById(id);
        if(!review) return res.status(400).json("review not found")

        let reqKeys = Object.keys(req.body);
        reqKeys.map(key=>{
            review[key] = req.body[key];
        })

        await review.save();
        res.status(200).json("updated");

    } catch (err) {
        res.status(500).json(err.message);
    }
}

async function deleteReview(req,res){
    try{
        let id = req.params.id;
        let review = await Review.findByIdAndDelete(id);
        res.json("deleted")
    }catch(err){
        res.status(500).json(err.message);
    }
}

module.exports = {createReview,getAllReviews,updateReview,deleteReview,getReview,getTopThreeReviews}