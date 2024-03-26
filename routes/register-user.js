
const express=require('express');
let router=express.Router();
 let {getUserById,editUserById,loginFunction,createUser}=require('../controllers/register-user')
 let {auth,restrictTo}= require('../middlewares/auth')

//to search about product by seller
router.get('/',getUserById)
//to search about product by seller
router.patch('/',auth,editUserById)
//create new user 
router.post('/', createUser)
//login 
router.post('/login',loginFunction)


module.exports=router;