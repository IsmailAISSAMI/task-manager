const mongoose = require('mongoose')
const validator = require('validator')

const User = mongoose.model('User',{
    name:{
        type: String,
        required: true, 
        trim: true 
    },
    email:{
        type: String,
        required: true,
        trim: true,
        lowercase: true,
        validate(string) {
            if(!validator.isEmail(string)){
                throw new Error('The Email is invalid!')
            }
        }
    },
    password: {
        type: String,
        required: true,
        trim: true,
        minLength: 6,
        validate(value) {
            if(value.toLowerCase().includes("password")){
                throw new Error('Password cannot contain "password"!')
            }
        }
    },
    age:{
        type: Number,
        required: false,
        default: 0,
        validate(value) {
            if(value < 0){
                throw new Error('The age must be a positif number!')
            }
        }
    }
})

module.exports = User