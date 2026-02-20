const express=require('express');
const path=require('path');
require('dotenv').config(); 
const mongodb=require('./utils/database').mongoConnect;
const productRoutes=require('./routes/productRoutes');
const app=express();    
app.use(express.json());

app.use("/admin/products",productRoutes);
mongodb(()=>{
    app.listen(process.env.PORT,()=>{
        console.log(`Server is running on port ${process.env.PORT}`);
    });     
});