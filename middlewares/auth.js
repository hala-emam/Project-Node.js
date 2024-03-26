const jwt= require('jsonwebtoken')

const {promisify} =require('util')

async function auth(request, response,next){
    let {authorization} = request.headers
  if(!authorization){
    return response.status(401).json({message:"you must login"})
  }

  try{
    let decoded =await promisify(jwt.verify)(authorization, process.env.MY_SECRET_VAR)
     request.id=decoded.data.id
     request.role=decoded.data.role
     console.log(decoded.data.role)
    
     next()
     //console.log(decoded.data)
    
  }
  
  catch(err){
  response.status(401).json({message: "unauthorized"})
  }
}


function restrictTo(...roles){
    return (request,response, next)=>{
    if(!roles.includes(request.role)){
     
     return response.status(403).json({message:'You cannot access this action'})
    }
    next()
    }
  }
 module.exports={auth,restrictTo}