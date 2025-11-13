const express = require('express');
const mongoose = require('mongoose');
const cors = require ('cors');
require('dotenv').config();


const app = express();
app.use(cors());
app.use(express.json());


mongoose.connect(process.env.MONGO_URL)
    .then(()=>{console.log("MongoDB connected")})
    .catch(err =>{console.log(err)});

const authRoutes = require('./routes/auth');
app.use('/api/auth',authRoutes)

const taskRoutes = require('./routes/task');
app.use('/api/tasks', taskRoutes)

const profileRoutes = require('./routes/profile');
app.use('/api/profile', profileRoutes);

const dashboardRoutes = require('./routes/dashboard');
app.use('/api/dashboard', dashboardRoutes);

app.get('/',(req,res)=>{
    res.send("Task Manager API Running")
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, ()=>{
    console.log(`Server running on ${PORT}`)
})
