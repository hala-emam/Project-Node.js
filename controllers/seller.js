const express=require('express');
const Seller=require('../models/seller')
const bcrypt=require('bcrypt')
const jsonWebToken=require('jsonwebtoken')

//function to get All seller 
const getSellers= async (request,response)=>{
    try{
        let sellers=await Seller.find({});
        response.status(200).json({data:sellers})
      }
      catch(err){
      response.status(400).json({message:err.message})
      }
}
//function to get seller by id
const getSellerById= async (request,response)=>{
    let {id}=request.params;
    
    try{
     let seller= await Seller.findById(id);
     if(seller){
         response.status(200).json({data:seller})
     }
     else{
         response.status(400).json({message:`seller doesn't exixt`}) //400 can't find
     }
    }
    catch(err){
     response.status(500).json({message:"try again later"})
    }
}

//create new new Seller
const createSeller=async (request, response)=>{
    try{
      let seller=request.body
      let newSeller= await Seller.create(seller)
      response.status(200).json({data:newSeller})
    }
    catch(err){
        response.status(400).json({message:err.message})
    }
  }


  //login function
  const loginFunction = async (request, response) => {
    let { email, password } = request.body;
    if (!email || !password) {
        return response.json({ message: `Email and password are required` });
    }
  

    try {
        let seller = await Seller.findOne({ email });
        if (!seller) {
            return response.status(404).json({ message: 'Invalid email or password' });
        }

        let isPasswordValid = await bcrypt.compare(password, seller.password);
        console.log(isPasswordValid)
        if (!isPasswordValid) {
            return response.status(401).json({ message: 'Invalid email or password' });
        }

        let token = await jsonWebToken.sign(
            { data: { email: seller.email, id: seller._id,role:seller.role } },
            process.env.MY_SECRET_VAR,
            { expiresIn: '1h' }
        );
        console.log(token)
        response.status(200).json({ message: "Success", token: token });
    } catch (error) {
        console.error("Error occurred during login:", error);
        response.status(500).json({ message: "Internal server error" });
    }
};
 
module.exports={getSellerById,createSeller,getSellers,loginFunction}