const express = require('express');
const router = express.Router();
const multer = require('multer')
const {updateUser,deleteUser,getAllUser,signup,login,getUser,forgetPassword,resetPassword,logout} = require('../controllers/user')

const {jwtVerify,isAdmin} = require('../middlewares/auth')
const upload = require('../middlewares/upload')


router
.route('/signup')
.post( upload.single('profileImage') ,signup)

//login
router
.route('/login')
.post(login)

//user options
router
.route('/:id')
.put(jwtVerify,updateUser)
.delete(jwtVerify,deleteUser)
.get( jwtVerify,getUser)



//ADMIN SPECIFIC

router
.route('/')
.get(jwtVerify,isAdmin,getAllUser)


//forgot password
router
.route('/forgotPassword')
.post(forgetPassword)


// reset password
router
.route("/resetPassword/:token")
.post(resetPassword)


// logout 
router
.route('/logout')
.post(jwtVerify,logout)


module.exports =router;