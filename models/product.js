const mongoose=require('mongoose');


const productSchema = mongoose.Schema({
    name: 
      {
        type: String,
        required: [true,'name is required'],
        trim:true,
      },
      description:
      {
        type:String,
      },
      createAt: 
      {
        type: Date,
        default: Date.now(),
        
      },
      sellerId:
      {
        type : mongoose.Schema.Types.ObjectId,
        ref: 'Seller'
     },
    image:String,

})

//create collection in db its name is products(Product)
const Product = mongoose.model('Product', productSchema);

module.exports = Product;