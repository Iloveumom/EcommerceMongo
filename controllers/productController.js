const Products=require('../models/product');
const addProduct=(req,res)=>{
   //validation can be added here
    const {title,price,description,imageUrl}=req.body;
    if(!title || !price || !description || !imageUrl){
        return res.status(400).json({message:'All fields are required'});
    }   
    const product=new Products(title,price,description,imageUrl,null,req.user._id);
    product.save()
    .then(result=>{
        res.status(201).json({message:'Product added successfully',product:result});
    })
    .catch(err=>{
        console.log(err);
        res.status(500).json({message:'Failed to add product'});
    });
};
const fetchAllProducts=(req,res)=>{
    Products.fetchAll()
    .then(products=>{   
        res.status(200).json({products});
    })
    .catch(err=>{
        console.log(err);
        res.status(500).json({message:'Failed to fetch products'});
    });     
};
const findProductById=(req,res)=>{
    const productId=req.params.id;  
    //validation can be added here
    if(!productId){
        return res.status(400).json({message:'Product ID is required'});
    }       
    Products.findById(productId)
    .then(product=>{
        if(!product){   
            return res.status(404).json({message:'Product not found'});
        }
        res.status(200).json({product});
    })
    .catch(err=>{
        console.log(err);
        res.status(500).json({message:'Failed to fetch product'});
    }); 
};
const updateProduct=(req,res)=>{
    const productId=req.params.id;
    if(!productId){
        return res.status(400).json({message:'Product ID is required'});
    }   
    const {title,price,description,imageUrl}=req.body;
    if(!title || !price || !description || !imageUrl){
        return res.status(400).json({message:'All fields are required'});
    }       
    const updateproduct=new Products(title,price,description,imageUrl,productId);
    updateproduct.save()
    .then(result=>{
        res.status(200).json({message:'Product updated successfully',product:result});
    })
    .catch(err=>{
        console.log(err);
        res.status(500).json({message:'Failed to update product'});
    });                                      

};
const deleteProduct=(req,res)=>{
    const productId=req.params.id;
    //validation can be added here
    if(!productId){
        return res.status(400).json({message:'Product ID is required'});
    }   
    Products.deleteById(productId)
    .then(result=>{
        res.status(200).json({message:'Product deleted successfully'}); 
    })
    .catch(err=>{
        console.log(err);
        res.status(500).json({message:'Failed to delete product'});
    });
};

module.exports={addProduct,fetchAllProducts,findProductById,updateProduct,deleteProduct};