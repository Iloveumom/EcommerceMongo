const express=require('express');
const path=require('path');
require('dotenv').config(); 
const mongodb=require('./utils/database').mongoConnect;
const productRoutes=require('./routes/productRoutes');

const User=require('./models/user');


const app=express();    
app.use(express.json());
app.use((req,res,next)=>{
    User.findById('6998a8dd58c561a902bd2aa6')
    .then(user=>{
    req.user=user;          
    next();
}).catch(err=>{
    console.log(err);
});
});
app.use("/admin/products",productRoutes);

mongodb(()=>{
    app.listen(process.env.PORT,()=>{
        console.log(`Server is running on port ${process.env.PORT}`);
    });     
});