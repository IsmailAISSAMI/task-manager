const express = require('express')
require("./db/mongoose")
const User = require("./models/user")
const Task = require("./models/task")
const { ObjectId } = require('mongodb')

const app = express()
const port = process.env.PORT || 3000

app.use(express.json())

// Create users
app.post('/users', async (req, res)=>{
    const user = new User(req.body)    
    try {
        await user.save()
        res.send(user)
    } catch(error){
        res.status(400).send(error)
    }
})

// Read users 
app.get('/users', async (req,res) => {
    try{
        const users = await User.find({})
        res.send(users)
    } catch(error){
        // Status 500 : Internal Server Error
        res.status(500).send()
    }
})

// Read a single user data 
app.get('/users/:id', async (req, res)=>{
    const _id = req.params.id
    try{
        const user = await User.findById(_id)
        if(!user){
            // Status 404: Not Found
            res.status(404).send()
        }
    } catch(error){
        res.status(500).send(error)
    }
})

app.patch('/users/:id', async (req,res)=>{
    // if the user want to update a field that doesn't exist 
    const updates = Object.keys(req.body)
    const allowedUpdates = ["name", "email", "password"]
    const isValidOperation = updates.every((update)=> allowedUpdates.includes(update))
    if(!isValidOperation){
        res.status(400).send({'error': 'invalid update!'})
    }
    try{
        const user = await User.findByIdAndUpdate(req.params.id, req.body, {new: true, runValidators: true})
        if(!user){
            res.satatus(404).send()
        }
        res.send(user)
    } catch(error){
        res.satatus(400).send()
    }
})

// Part 2 : Tasks
app.post('/tasks', async (req,res)=>{
    const task = new Task(req.body)
    try{
        await task.save()
        res.send(task)
    } catch(error){
        res.status(400).send(error)
    }
})

app.get('/tasks', async (req,res)=>{
    try{
        const tasks = await Task.find({})
        res.send(tasks)
    } catch(error){
        res.status(500).send()
    }
})

app.get('/tasks/:id', async (req,res)=>{
    const _id = req.params.id
    try{
        const task = await Task.findById(_id)
        if(!task){
            return res.status(404).send()
        }
        res.send(task)
    } catch(error){
        res.status(500).send()
    }
})

app.patch('/tasks/:id', async (req, res)=>{
    const updates = Object.keys(req.body)
    const allowedUpdates = ["description", "completed"]
    const isValidOperation = updates.every((update)=> allowedUpdates.includes(update))
    if(!isValidOperation){
        res.status(400).send({error: "Invalide update!"})
    }
    try{
        const task = await Task.findByIdAndUpdate(req.params.id, req.body, {new: true , runValidators: true })
        if(!task){
            res.status(404).send()
        }
        res.send(task)
    } catch(error){
        res.status(500).send()
    }
})

app.listen(port, ()=>{
    console.log('server is up at the port '+port)
})