
const mongoose=require('mongoose');
const bcrypt=require('bcrypt');

// Define the seller schema
const sellerSchema = mongoose.Schema({
    name: 
    {
      type: String,
      required: [true, 'the name is required'],
      trim: true
    },
    role:
    {
      type: String,
      default:"Seller",
   },
  password: 
    {
        type: String,
        required:true,
    },
    email:
    {
        type: String,
        required:[true,"email address is required"],
        validate:
        {
            validator:function(val){
                return /^[a-zA-Z]{3,8}(@)(gmail|yahoo|outlook)(.com)$/.test(val)
            },
            message:(em)=>`${em.value} Email validation failed'`
        }
    
    },
});

 sellerSchema.pre('save', async function(next){
        
    let salt= await bcrypt.genSalt(10)
    let getHashPassword= await bcrypt.hash(this.password, salt)
    this.password=getHashPassword;


    next();
})


  //create collection in db its name sellers(Seller)
  const Seller = mongoose.model('Seller', sellerSchema);

  module.exports = Seller;