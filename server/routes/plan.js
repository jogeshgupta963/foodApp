const express = require('express');


const {getAllPlans,getPlan,createPlan,updatePlan,deletePlan} = require('../controllers/plan')

const {jwtVerify,isAdminOrOwner} = require('../middlewares/auth')

const router = express.Router();


router.route('/allPlans')
.get(getAllPlans)

//user specific
router
.route('/myPlans/:id')
.get(jwtVerify,getPlan)


//admin specific routes
router
.route('/plans')
.post(jwtVerify,isAdminOrOwner,createPlan)

router.route('/plans/:id')
.put(jwtVerify,isAdminOrOwner,updatePlan)
.delete(jwtVerify,isAdminOrOwner,deletePlan)



module.exports = router; 