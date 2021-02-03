const express = require('express')
require("./db/mongoose")
const User = require("./models/user")
const Task = require("./models/task")

const app = express()
const port = process.env.PORT || 3000

app.use(express.json())

// Create users
app.post('/users', (req, res)=>{
    const user = new User(req.body)    
    user.save().then((user)=>{
        res.send(user)
    }).catch((error)=>{
        res.status(400).send(error)
    })
})

// Read users 
app.get('/users', (req,res) => {
    User.find({}).then((users)=>{
        res.send(users)
    }).catch((error)=>{
        // Status 500 : Internal Server Error
        res.status(500).send()
    })
})

// Read a single user data 
app.get('/users/:id', (req, res)=>{
    const _id = req.params.id
    User.findById(_id).then((user)=>{
        if(!user){
            // Status 404: Not Found
            return res.status(404).send()
        }
        res.send(user)
    }).catch((error)=>{
        res.status(500).send()
    })
})


// Part 2 : Tasks
app.post('/tasks',(req,res)=>{
    const task = new Task(req.body)
    task.save().then((task)=>{
        res.send(task)
    }).catch((error)=>{
        res.status(400).send(error)
    })
})

app.get('/tasks', (req,res)=>{
    Task.find({}).then((tasks)=>{
        res.send(tasks)
    }).catch((error)=>{
        res.status(500).send()
    })
})

app.get('/tasks/:id', (req,res)=>{
    const _id = req.params.id
    Task.findById(_id).then((task)=>{
        if(!task){
            return res.status(404).send()
        }
        res.send(task)
    }).catch((error)=>{
        res.status(500).send()
    })
})

app.listen(port, ()=>{
    console.log('server is up at the port '+port)
})