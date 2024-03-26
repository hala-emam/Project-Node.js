
const express=require('express');
const Product=require('../models/product')
//function to get products
const getProduct=async (request , response ,next)=>{
   
    try{
        let findproducts = await Product.find({}).populate('sellerId');
      
        response.status(201).json({data:findproducts })
    }
    catch(err){
        next({status:'400', err:err})
        
    }
}

//function to get products
const createProduct=async (request , response ,next)=>{
    let newProduct= request.body;
    newProduct.image=request.body;
    newProduct.sellerId= request.id;
    newProduct.role=request.role;
    const file = request.file;
  if (!file) {
    res.status(400).json({ message: "there is no image in this request" });
  }
  const fileName = request.file.filename;
 
      try{
        const basePath = `${request.protocol}:${request.get("host")}/public/uploads/`;
        (newProduct.image= `${basePath}${fileName}`),
          "http:localhost:4001/public/uploads/image-5656565";
          //////////////////////////////////////////////////////////
        let insertedProduct=await Product.create(newProduct);
        response.status(201).json({message:"success", data:insertedProduct})
    }
    catch(err){
        //next(err)
      response.status(400).json({message:err.message})
    }
}

//function to update/edit products by id
const editProductById=async (request , response,next )=>{
    let {id}=request.params;
    let {name}=request.body;
    try{
        let updateProduct= await Product.findByIdAndUpdate(id,{name},{new:true});
      
        response.status(200).json({data:updateProduct})
       }
       catch(err){
        response.status(422).json({message:err.message}) //422 problem in rquest
       }
}
//function to delete products
const deleteProductById=async (request , response ,next)=>{
    let {id}=request.params;
    try{
        let deleteProduct= await Product.deleteOne({_id:id});
      
        response.status(200).json({data:deleteProduct})
       }
       catch(err){
        response.status(422).json({message:err.message}) //422 problem in rquest
       }
}

//function to search about product by seller id
const searchToProductBySellerId=async (request , response ,next)=>{
    
    try {
        const { sellerId } = request.params;
       const products = await Product.find({ sellerId: sellerId });
        
        if (products.length > 0) {
            response.status(200).json({ data: products });
        } else {
            response.status(404).json({ message: `Product with sellerId '${sellerId}' not found` });
        }
    } catch (err) {
        console.error(err);
        response.status(500).json({ message: "Internal Server Error" });
    }

    
}
//function to search about product by product name
const searchToProductByName=async (request , response ,next)=>{
    try {
        const { name } = request.params;
        const products = await Product.find({ name: name });
        console.log(products)
        
        if (products.length > 0) {
            response.status(200).json({ data: products });
        } else {
            response.status(404).json({ message: `Product with name '${name}' not found` });
        }
    } catch (err) {
        // console.error(err);
        response.status(500).json({ message: "Internal Server Error" });
    }


   

}



module.exports={searchToProductByName,searchToProductBySellerId,getProduct,createProduct,editProductById, deleteProductById }