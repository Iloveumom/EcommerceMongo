const express=require('express');
const path=require('path');
require('dotenv').config(); 
//const mongodb=require('./utils/database').mongoConnect;
const mongoose=require('mongoose');
const productRoutes=require('./routes/productRoutes');

const User=require('./models/user');


const app=express();    
app.use(express.json());

app.use((req,res,next)=>{
    User.findById('6999d89883f4b80578c92782')
    .then(user=>{
        req.user=user;
  //  console.log(user.username,user.email,user.cart,user._id);  
   // req.user=new User(user.username,user.email,user.cart,user._id);          
  //  console.log(req.user);
    next();
}).catch(err=>{
    console.log(err);
});
});
app.use("/admin/products",productRoutes);
mongoose.connect(process.env.MONGODB_URL)
.then(result=>{
    console.log('Connected to MongoDB');
    user=User.findOne().then(user=>{
        if(!user){
            const user=new User({
                username:'jitender',
                email:'jt@outlook.com'
            });
            user.save().then(result=>{
                console.log('User created');
            }).catch(err=>{
                console.log(err);
            });
        }
    }); 

    app.listen(process.env.PORT,()=>{
        console.log(`Server is running on port ${process.env.PORT}`);
    }); 
}
).catch(err=>{
    console.log(err);
});



/*
mongodb(()=>{
    app.listen(process.env.PORT,()=>{
        console.log(`Server is running on port ${process.env.PORT}`);
    });     
});
*/