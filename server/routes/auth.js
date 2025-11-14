const express = require('express');
const User = require('./../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const nodemailer = require("nodemailer");
const router = express.Router();

router.post('/register',async (req,res)=>{
    try{
        const{name,email,password} = req.body;

        const existingUser = await User.findOne({email});
        if(existingUser){
            return res.status(400).json({message:"User already exist"})
        }

        const hashedPassword = await bcrypt.hash(password,10);

        const newUser = new User({
            name,
            email,
            password:hashedPassword
        })

        await newUser.save();

        res.status(201).json({message:"User registered successfully"})
    }
    catch(err){
        console.log(err);
        res.status(500).json({message:"Server error"});
    }
})

router.post('/login', async(req,res)=>{
    try{
        const{email,password} = req.body;

        const user = await User.findOne({email});

        if(!user){
            return res.status(400).json({message:"Invalid email"})
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch){
            return res.status(400).json({message:"Invalid password"})
        }

        const token = jwt.sign(
            {id:user._id},
            process.env.JWT_SECRET,
            {expiresIn:"7d"}
        )

        res.json({
            message:"user loggedin successfully",
            token,
            user:
            {
            id:user._id,
            name:user.name,
            email:user.email
            }
    })
    } catch(err){
        console.log(err);
        res.status(500).json({message:"server error"})
    }
})

router.post('/forgot-password', async (req,res)=>{
    try{
        const {email} = req.body;
        const user = await User.findOne({email});
        console.log(" User found:", user ? user.email : "no user");


        if(!user){
          console.log(" No account found");
          return  res.status(400).json({message:"No account found"})
        }

        

            const otp = Math.floor(100000 + Math.random() * 900000).toString();
             console.log(" OTP generated:", otp);

   
    user.otp = otp;
    user.otpExpiry = Date.now() + 5 * 60 * 1000;

    await user.save();
    console.log(" OTP saved to database");

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL,
        pass: process.env.EMAIL_PASSWORD
        

      }

    });

    await transporter.sendMail({
      from: process.env.EMAIL,
      to: user.email,
      subject: "Your Password Reset OTP",
      text: `Your OTP is ${otp}. Valid for 5 minutes.`
    });

    res.json({ message: "OTP sent to your email" });
    } catch(err){
      console.log("Forgot password error:", err);

        res.status(500).json({message:"Server error", error:err.message})
    }
})

router.post('/reset-password', async (req, res) => {
  try {
    const { email, otp, newPassword } = req.body;

    const user = await User.findOne({ email });

    if (!user || user.otp !== otp) {
      return res.status(400).json({ message: "Invalid OTP" });
    }

    if (user.otpExpiry < Date.now()) {
      return res.status(400).json({ message: "OTP expired" });
    }

    // Hash new password
   
    const hashed = await bcrypt.hash(newPassword, 10);

    user.password = hashed;
    user.otp = null;
    user.otpExpiry = null;

    await user.save();

    res.json({ message: "Password reset successful" });

  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;