const express = require('express');
const User = require('./../models/User');
const authMiddleware = require('./../middleware/auth');
const bcrypt = require('bcryptjs');

const router = express.Router();

router.get('/me', authMiddleware, async(req,res)=>{
    try{
        const user = await User.findById(req.userId).select("-password");
        res.json(user);

    } catch(err){
        res.status(500).json({message:"Server error"})
    }
})

router.put('/update',authMiddleware,async(req,res)=>{
    try{
        const {name,email,password} = req.body;
        const updateData = {name,email};

        if(password){
            updateData.password = await bcrypt.hash(password, 10)
        }

        await User.findByIdAndUpdate(req.userId, updateData);
        res.json({message:"User updated successfully"})
    } catch(err){
        res.status(500).json({message:"Server error"})
    }
})

module.exports = router;