const express=require('express');
let router=express.Router();
let {getSellerById,createSeller,getSellers,loginFunction}=require('../controllers/seller')
let {auth,restrictTo}= require('../middlewares/auth')
//to get sellers 
router.get('/', getSellers)
//to get seller by id
router.get('/:id', getSellerById)
//create new seler
router.post('/',createSeller)
//login
router.post('/login',loginFunction)




module.exports=router;