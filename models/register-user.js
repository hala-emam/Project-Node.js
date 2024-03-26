const mongoose=require('mongoose');
const bcrypt=require('bcrypt');

// Define the register user schema
const userSchema= mongoose.Schema({
    userName:
    {
        type: String,
        required:true,
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
   
    role:{
        type: String,
        default:"register-user",
    }
    },{timestamps:true})
    

    userSchema.pre('save', async function(next){
        
        let salt= await bcrypt.genSalt(10)
        let getHashPassword= await bcrypt.hash(this.password, salt)
        this.password=getHashPassword;
    
     
        next();
    })
    //create collection in db ts name is 
    let User=mongoose.model('User', userSchema)
    
    module.exports=User
  
