const mongoose = require('mongoose')
const validator = require('validator')

// mongoose.connect("mongodb://127.0.0.1:27017/task-manager",{
//     useNewUrlParser:true,
//     useUnifiedTopology: true, 
//     useCreateIndex: true 
// })

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

// const user1 = new User({
//     name: 'aissami',
//     email: 'ismail@gmail.com',
//     password: 'mypword',
//     age: 26
// })

// user1.save().then((user)=>{
//     console.log('The user is added to db!\n', user)
// }).catch((error)=>{
//     console.log('the user is not added to db!\n', error)
// })

module.exports = User