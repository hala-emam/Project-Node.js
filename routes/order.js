const express=require('express');
let router=express.Router();
 let {createOrder, getOrder}=require('../controllers/order')
  let{auth,restrictTo}=require('../middlewares/auth')

//to create new order
router.post('/',auth,restrictTo("register-user"),createOrder)
router.get('/',getOrder)
module.exports=router;