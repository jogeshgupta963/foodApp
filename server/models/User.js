const mongoose = require('mongoose');
const emailValidator = require('email-validator');
const { v4: uuidv4 } = require('uuid');
const userSchema = new mongoose.Schema({

    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
        // validate:()=>{
        //     return emailValidator.validate(this.email);
        // }
    },
    password:{
        type:String,
        required:true,
        minlength:8,
    },
    role:{
        type:String,
        enum:['admin','user','owner','delivery-boy'],
        default:'user'
    },
    profileImage:{
        type:String,
        default:'img/users/default.jpeg'
    },
    resetToken:String
})

userSchema.set('timestamps',true);

userSchema.methods.createResetToken = ()=>{

    const token = uuidv4();
    this.resetToken = token;
    return token;
}

userSchema.methods.resetPasswordHandler = (password)=>{
    this.password = password;
    this.resetToken = undefined;
}

const User = mongoose.model('user',userSchema);


module.exports = User;