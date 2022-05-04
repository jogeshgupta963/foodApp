const express = require('express');
const { jwtVerify } = require('../middlewares/auth');
const router = express.Router();

const {createReview,getAllReviews,updateReview,deleteReview,getReview,getTopThreeReviews} = require('../controllers/review')

router
.route('/')
.get(getAllReviews)

router
.route('top3reviews')
.get(getTopThreeReviews)

router
.route('/:id')
.post(jwtVerify,createReview) //----> plan id
.put(jwtVerify,updateReview)// -----> review id
.delete(jwtVerify,deleteReview)
.get(getReview)





module.exports = router;