const express = require('express');

const {jwtVerify,isAdminOrOwner} = require('../middlewares/auth')

const {createSession} = require('../controllers/booking')

const router = express.Router();

router.route('/createSession')
.post(jwtVerify,createSession) 

module.exports = router;