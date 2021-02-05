const express = require("express")
const User = require("../models/user")
const router = new express.Router

// Create users
router.post('/users', async (req, res)=>{
    const user = new User(req.body)    
    try {
        await user.save()
        res.send(user)
    } catch(error){
        res.status(400).send(error)
    }
})

// Read users 
router.get('/users', async (req,res) => {
    try{
        const users = await User.find({})
        res.send(users)
    } catch(error){
        // Status 500 : Internal Server Error
        res.status(500).send()
    }
})

// Read a single user data 
router.get('/users/:id', async (req, res)=>{
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

// Update user
router.patch('/users/:id', async (req,res)=>{
    // if the user want to update a field that doesn't exist 
    const updates = Object.keys(req.body)
    const allowedUpdates = ["name", "email", "password"]
    const isValidOperation = updates.every((update)=> allowedUpdates.includes(update))

    if(!isValidOperation){
        res.status(400).send({'error': 'invalid update!'})
    }

    try{
        const user = await User.findById(req.params.id)
        updates.forEach((update)=>{
            user[update] = req.body[update]
        })
        await user.save()

        if(!user){
            res.satatus(404).send()
        }
        res.send(user)
    } catch(error){
        res.status(400).send()
    }
})

// Delete user
router.delete('/users/:id', async(req, res)=>{
    try{
        const user = await User.findByIdAndDelete(req.params.id)
        if(!user){
            res.status(404).send()
        }
        res.send(user)
    } catch(e){
        res.status(500).send()
    }
})


module.exports = router 