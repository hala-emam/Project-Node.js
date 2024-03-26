
const express=require('express');
const router=express.Router();
const {getProduct,createProduct,editProductById, deleteProductById,searchToProductByName,searchToProductBySellerId}=require('../controllers/product');
const {auth,restrictTo}= require('../middlewares/auth')
const multer=require("multer")


const FILE_TYPE_MAP = {
    "image/png": "png",
    "image/jpeg": "jpeg",
    "image/jpg": "jpg",
  };
  const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      const isvalid = FILE_TYPE_MAP[file.mimetype];
      let uploadError = new Error("Invalid Image type");
      if (isvalid) {
        uploadError = null;
      }
      cb(uploadError, "public/uploads");
    },
    filename: function (req, file, cb) {
      const fileName = file.originalname.split("").join("-");
      const extention = FILE_TYPE_MAP[file.mimetype]
      cb(null, `${fileName}- ${Date.now()}.${extention}`)
      
    }
  });
  
  const uploadOptions = multer({ storage: storage });
//to get product
router.get('/',getProduct )

//to  create product
router.post('/',uploadOptions.single('image'),auth,restrictTo("Seller"),createProduct )

//to  update  product
router.patch('/:id',auth,restrictTo("Seller"),restrictTo("register-user"),editProductById )

//to  delete product
router.delete('/:id',auth,restrictTo("Seller"),deleteProductById )

// Search product by seller
router.get('/seller/:sellerId' ,restrictTo("Seller"),searchToProductBySellerId);

// Search product by name
router.get('/name/:name',restrictTo("register-user"),searchToProductByName);


module.exports=router;