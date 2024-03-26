const express=require('express');
const Order=require('../models/order')


//function to create order
const createOrder=async (request, response)=>{
    let newOrder= request.body;
    newOrder.userId= request.id;
    console.log( request.id)
    try{
        let createNewOrder=await Order.create(newOrder);
        response.status(201).json({message:"success", data:createNewOrder})
    }
    catch(err){
        //next(err)
      response.status(400).json({message:err.message})
    }
}
//function to get products
const getOrder=async (request , response ,next)=>{
   
    try{
        let findOders = await Order.find().populate('userId');
      
        response.status(201).json({data:findOders })
    }
    catch(err){
        next({status:'400', err:err})
        
    }
}
module.exports={createOrder,getOrder}