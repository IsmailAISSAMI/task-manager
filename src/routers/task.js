const express = require("express")
const Task = require("../models/task")
const User = require("../models/user")
const router = new express.Router 

router.post('/tasks', async (req,res)=>{
    const task = new Task(req.body)
    try{
        await task.save()
        res.send(task)
    } catch(error){
        res.status(400).send(error)
    }
})

router.get('/tasks', async (req,res)=>{
    try{
        const tasks = await Task.find({})
        res.send(tasks)
    } catch(error){
        res.status(500).send()
    }
})

router.get('/tasks/:id', async (req,res)=>{
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

router.patch('/tasks/:id', async (req, res)=>{

    const updates = Object.keys(req.body)
    const allowedUpdates = ["description", "completed"]
    const isValidOperation = updates.every((update)=> allowedUpdates.includes(update))
    if(!isValidOperation){
        res.status(400).send({error: "Invalide update!"})
    }

    try{
        const task = await Task.findById(req.params.id)
        updates.forEach((update)=>{
            task[update] = req.body[update]
        })
        task.save()
        
        if(!task){
            res.status(404).send()
        }
        res.send(task)
    } catch(error){
        res.status(500).send()
    }
})

router.delete('/tasks/:id', async (req,res)=>{
    try{
        const task = await Task.findByIdAndDelete(req.params.id)
        if(!task){
            res.status(404).send()
        }
        res.send(task)
    } catch(e){
        res.status(500).send()
    }
})


module.exports = router 