const express = require("express");
const UserModel = require("../models/user.mode");
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");
const checkAccess = require("../middlewares/checkAccess");


const userRouter = express.Router();

// Only admin can see all member data
userRouter.get("/users", checkAccess("Admin"), async(req,res) =>{
    try{
        const members = await UserModel.find();
        res.status(200).json({msg:"Members data fetch successfully", members})
        
    }catch(err){
        res.send(`Err occured while feching members db:${err}`)
    }
})

// Spasific Id user data Fetch

userRouter.get("/users/:id", checkAccess("Admin"), async(req,res) =>{
    const{id} = req.params
  
    try{
        const members = await UserModel.findById(id);
        res.status(200).json({msg:" Spasific Id User data fetched successfully", members})
        
    }catch(err){
        res.send(`Err occured while feching members db:${err}`)
    }
})

// Update Spasific user id  data 

userRouter.patch("/users/:id", checkAccess("Admin"), async(req,res) =>{
    const{id} = req.params
    
    try{
        const updateUser = await UserModel.findByIdAndUpdate({_id:id}, req.body)
        res.status(200).json({msg:" Spasific Id User data Updated successfully", updateUser})
        
    }catch(err){
        res.send(`Err occured while updateing user db:${err}`)
    }
})

// Register logic
userRouter.post("/register", async(req,res)=>{

    try{
        const{username, password, role, name, email, borroweBooks} = req.body;
        const user  = await UserModel.find({email});
        // if(user){
        //     return res.send(402).json({msg:"User already exist!"})
        // }

        const hashPassword = await bcrypt.hash(password, 10);

        const newUser = new UserModel({name, username, email, password:hashPassword, role})
         await newUser.save();
        res.status(200).json({msg:"User registered successfully!", newUser});

    }catch(err){
        res.send(`Err occured while register :${err}`)
    }
})

// Loing Logic 
userRouter.post("/login", async(req,res) =>{
    const {username, password} = req.body;
    try{
        const user = await UserModel.findOne({username})
        if(!user) {
            return res.status(404).json({msg:"404, User not found"})
        }

        const isValidPassword = await bcrypt.compareSync(password, user.password);
        if(!isValidPassword){
            return res.status(402).json({msg:"password is wrong!"})
        }

        const token = jwt.sign({_id:user._id, role:user.role }, process.env.SEKRET_KEY)

        res.status(200).json({msg:"Login successfully😎", token, userId:user._id })
    }catch(err){
        res.send(`Err occured while login: ${err}`)
    }
})

module.exports = userRouter;

