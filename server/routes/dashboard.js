const express = require('express');
const Task = require('./../models/Task');
const authMiddleware = require('./../middleware/auth');
const router = express.Router();

router.get('/stats', authMiddleware, async(req,res)=>{
    try {
        const userId = req.userId;

        const total = await Task.countDocuments({userId});
        const completed = await Task.countDocuments({userId, status:"completed"});
        const pending = await Task.countDocuments({userId,status:"pending"});

        res.json({total, completed, pending});
    }catch(err){
        res.status(500).json({message:"Server error"})
    }
})

module.exports = router;