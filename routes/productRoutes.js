const express=require('express');
const router=express.Router();
const {addProduct,fetchAllProducts,findProductById,updateProduct, deleteProduct}=require('../controllers/productController');



router.post('/add',addProduct);
router.get('/fetch',fetchAllProducts);
router.get('/fetch/:id',findProductById);
router.put('/update/:id',updateProduct);
router.delete('/delete/:id',deleteProduct);
module.exports=router;