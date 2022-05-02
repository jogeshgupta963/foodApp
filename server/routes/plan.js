const express = require('express');


const { createPlan } = require('../controllers/plan');
const {jwtVerify,isAdmin} = require('../middlewares/auth')

const router = express.Router();


//admin specific routes
router
.route('/')
.post(jwtVerify,isAdmin,createPlan)


module.exports = router;