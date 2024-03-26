//import package to handle requests and responses
const express=require('express');
//import package to connect to db 
const mongoose=require('mongoose')
//import package to hashing or encrypt sensitive data
const dotEnv=require('dotenv')

//import all routes
let productRoutes=require('./routes/product')
let sellerRoutes=require('./routes/seller')
let orderRoutes=require('./routes/order')
let registergUserRoutes=require('./routes/register-user')


dotEnv.config()

//conncet to database
mongoose.connect(process.env.DB).then(()=>{
    console.log("connected to db success")
}).catch((err)=>
{
     console.log(err)
})


//create object -> contain all functions in package
const app = express();


//to parsing request data
app.use(express.json())


//API ->localhost:port/route
app.use('/products', productRoutes)
app.use('/sellers', sellerRoutes)
app.use('/regist-users', registergUserRoutes)
 app.use('/orders', orderRoutes)


// Start the server
app.listen(2001,()=>{
    console.log("Server is connect on port 2001")
})