const express=require('express');
const registerUser=require('../models/register-user')
const bcrypt=require('bcrypt')
const jsonWebToken=require('jsonwebtoken')
//function to get user by id
const getUserById= async (request,response)=>{
    let {id}=request.params;
    
    try{
     let user= await registerUser.findById(id);
     if(user){
         response.status(200).json({data:user})
     }
     else{
         response.status(400).json({message:`user doesn't exist`}) //400 can't find
     }
    }
    catch(err){
     response.status(500).json({message:"try again later"})
    }
}

//create new  user
const createUser=async (request, response)=>{
    try{
      let user=request.body
      let newUser= await registerUser.create(user)
      response.status(200).json({data:newUser})
    }
    catch(err){
        response.status(400).json({message:err.message})
    }
  }

//function to edit user by id
const editUserById= async (request,response)=>{
    let {id}=request.params;
    let {userName,email,password}=request.body;
    
    try{
        let updateUserInfo= await registerUser.findByIdAndUpdate(id,{userName,email,password},{new:true});
         
        response.status(200).json({data:updateUserInfo})
       }
       catch(err){
        response.status(422).json({message:err.message}) //422 problem in rquest
       }
}

//login function
const loginFunction=async (request, response)=>{
    let {email,password}=request.body
    if(!email || !password){
       return  response.json({message:`email and password is required`})
    }
 
    let regUser =await registerUser.findOne({email:email})
    if(!regUser){
     return response.status(404).json({message:' invalid email or passowrd'})
    }
 
    let userPass =await bcrypt.compare(password, regUser.password)
    if(!userPass){
     return response.status(401).json({message:' invalid email or passowrd'})
    }
 
    let token =await jsonWebToken.sign({data:{email:regUser.email, id:regUser._id,role:regUser.role}}, process.env.MY_SECRET_VAR,{ expiresIn: '1h' })
 
    response.status(200).json({message:"success", token:token})
 }
module.exports={getUserById,editUserById,createUser,loginFunction}