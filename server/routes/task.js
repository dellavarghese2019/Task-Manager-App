const express = require('express');
const Task = require('../models/Task');
const authMiddleware = require('../middleware/auth')
const router = express.Router();

router.post('/',authMiddleware, async(req,res)=>{
    try{
        const{title,description,status} = req.body;

        const newTask = new Task({
            title,
            description,
            status,
            userId:req.userId
        })

        await newTask.save();
        res.status(201).json({message:"Task created successfully", task:newTask});
    } catch(err){
        console.log(err);
        res.status(500).json({message:"Server error"})
    }
})

router.get('/:userId',authMiddleware,async(req,res)=>{
    try{
        const tasks = await Task.find({userId:req.params.userId});
        res.json(tasks);
    } catch(err){
        console.log(err);
        res.status(500).json({message:"Server error"})
    }
})

router.put('/:taskId',authMiddleware, async(req,res)=>{
    try {
        const updatedTask = await Task.findByIdAndUpdate(
            req.params.taskId,
            req.body,
            {new:true}
        );
        res.json({message:"Task updated",updatedTask})

    } catch(err){
        console,log(err);
        res.status(500).json({message:"Server error"})
    }
})

router.delete('/:taskId',authMiddleware,async(req,res)=>{
    try{
        await Task.findByIdAndDelete(req.params.taskId)
        res.json({message:"Task deleted"})
    } catch(err){
        console.log(err);
        res.status(500).json({message:"Server error"})
    }
})

module.exports = router;