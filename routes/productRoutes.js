const express=require('express');
const router=express.Router();
const {addProduct,fetchAllProducts,findProductById,
    updateProduct, deleteProduct,addToCart,
    deleteFromCart,getCart}=require('../controllers/productController');
router.post('/add',addProduct);
router.get('/fetch',fetchAllProducts);
router.get('/fetch/:id',findProductById);
router.put('/update/:id',updateProduct);
router.delete('/delete/:id',deleteProduct);

router.post('/add-to-cart/:id',addToCart);
router.delete('/delete-from-cart/:id',deleteFromCart);
router.get('/cart',getCart);
module.exports=router;