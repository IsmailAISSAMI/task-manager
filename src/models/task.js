const mongoose = require("mongoose")

mongoose.connect("mongodb://127.0.0.1:27017/task-manager", {
    useNewUrlParser: true,
    useUnifiedTopology: true, 
    useCreateIndex: true
})

const Task = mongoose.model('Task',{
    description:{
        type: String, 
        required: true, 
        trim: true
    }, 
    completed:{
        type: Boolean,
        required: false,
        default: false
    }
})

const t1 = new Task({
    description:'     the first task of the day',
})

t1.save().then((task)=>{
    console.log("--We saved the following task to db\n", task)
}).catch((error)=>{
    console.log("--Error:\n", error)
})

module.exports = Task