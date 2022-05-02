const User  = require('../models/User')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt');

require('dotenv').config()


//@route /:id
//@desc GET to get a user
//@access Public
async function getUser(req,res){
    try {
        let {id} = req.params;
        let user = await User.findById(id);
        if(!user) return res.status(400).json("user not found");

        res.status(200).json(user);
    } catch (err) {
        res.status(500).json(err.message);
    }   
}

//@route /:id
//@desc PUT to update a user
//@access Private/auth
async function updateUser(req,res){
    try {
        let {id} = req.params;
        let user = await User.findById(id);
        if(!user) return res.status(400).json("user not found");

        let reqKeys = Object.keys(req.body);

        reqKeys.map(key=>{
            user[key] = req.body[key];
        })
        await user.save();
        res.status(200).json("data updated successfully");
    } catch (err) {
        res.status.json(err.message);
    }
}

//@route /:id
//@desc DELETE to delete a user
//@access Private/auth

async function deleteUser(req,res){
    try {
        let {id} = req.params
        let user = await User.findOneAndDelete({_id:id});
        if(!user) return res.status(400).json("user not found");
        res.status(200).json("user deleted successfully");
    } catch (err) {
        res.status(500).json(err.message)
    }
}

//@route /
//@desc PUT to get all user
//@access Private/admin
async function getAllUser(req,res)
{
    try {
        let users = await User.find();
        res.status(200).json({
            msg:"users retrieved",
            data:users
        })
    } catch (err) {
        res.status(500).json(err.message);
    }
}

//@route /signup
//@desc POST to signup a user
//@access Public

async function signup(req,res){
    try {

        const isExist = await User.findOne({email:req.body.email})
        if(isExist){
            return res.status(400).json("user already registered")
        }

        //hashing password
        let salt = await bcrypt.genSalt();
        let hashedString = await bcrypt.hash(req.body.password, salt.toString());
        req.body.password = hashedString;

         //creating user
         let user = await User.create(req.body);

         //creating jwt
         const JWT = jwt.sign({ user: user._id }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRESIN,})

         res.cookie("JWT", JWT)
         res.status(200).json("user registered")

    } catch (err) {
        res.status(500).json(err.message)
    }
}
//@route /login
//@desc POST to login a user
//@access public
async function login(req,res){
    try {   
        const {email,password} = req.body;
        let data = await User.findOne({email});
        if (!data) {
            return res.status(400).json("Invalid Credentials")
        }

        let matchPass = await bcrypt.compare(password, data.password)
        if (!matchPass) {
            return res.status(400).json("Invalid Credentials")
        }
        const JWT = jwt.sign({ user: data._id }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRESIN })
        res.cookie("JWT", JWT)
        res.status(200).json({
            status:true,
            msg:"user logged in"
        })


    } catch (err) {
        res.status(500).json(err.message);
    }
}

//@route /forgotPassword
//@desc POST to reset  a user pass
//@access public

async function forgetPassword(req,res){
    try {
        const {email} = req.body;
        const user = await User.findOne({email});
        if(!user) return res.json("user not found");

        const resetToken = user.createResetToken();
        let resetPasswordLink = `${req.protocol}://${req.get('host')}/resetPassword/${resetToken}` 

        //send email



    } catch (err) {
        res.status(500).json(err.message);
    }
}

//@route /resetPassord/:token
//@desc POST to reset  a user pass
//@access public

async function resetPassword(req,res){
    try {
        const {token} =req.params;
        const user = await User.findOne({resetToken:token})

        //update password in dp
        user.resetPasswordHandler(password,confirmPassword);

        user.save();
        res.status(200).json("password changed successfully");
    } catch (err) {
        res.status(500).json(err.message);
    }
}
//@route /logout
//@desc POST to logout a user
//@access private
function logout(req,res){
    try {
        req.cookies.JWT = ""
        res.cookie('JWT',{maxAge:1});
        // console.log(token);
        // let cookies = res.cookies
        // res.json(req.cookies.JWT)
        // res.cookie(req.cookies.JWT ,{expiresIn:1});
        // res.redirect('/user/login');
        res.json("logged out")
    } catch (err) {
        res.status(500).json(err.message);
    }
}

module.exports ={updateUser,deleteUser,getAllUser,signup,login,getUser,forgetPassword,resetPassword,logout}