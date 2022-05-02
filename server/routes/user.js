const express = require('express');
const router = express.Router();

const {updateUser,deleteUser,getAllUser,signup,login,getUser,forgetPassword,resetPassword,logout} = require('../controllers/user')

const {jwtVerify,isAdmin} = require('../middlewares/auth')

//signup
router
.route('/signup')
.post(signup)

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
.route('forgotPassword')
.post(forgetPassword)


// reset password
router
.route("/resetPassord/:token")
.post(resetPassword)


// logout 
router
.route('/logout')
.post(jwtVerify,logout)


module.exports =router;