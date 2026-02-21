const mongoose=require('mongoose');
const Schema=mongoose.Schema;
const userSchema=new Schema({
    username:{
        type:String,
        required:true
    },
    email:{     
        type:String,
        required:true
    },
    cart:{
        items:[
            {
                productId:{
                    type:Schema.Types.ObjectId,
                    ref:'Product',  
                    required:true
                },
                quantity:{
                    type:Number,    
                    required:true
                }
            }
        ]
    }
});
userSchema.methods.addToCart=function(product){
    const cartProductIndex = this.cart.items.findIndex(cp => {
        return cp.productId.toString() === product._id.toString();
    }); 
    let newQuantity = 1;
    const updatedCartItems = [...this.cart.items];
    if (cartProductIndex >= 0) 
    {
        newQuantity = this.cart.items[cartProductIndex].quantity + 1;  
        updatedCartItems[cartProductIndex].quantity = newQuantity; 
    }   
    else
    {
        updatedCartItems.push({
            productId: product._id,
            quantity: newQuantity
        });
    }
    this.cart = {
        items: updatedCartItems
    };
    return this.save();
};
userSchema.methods.deleteItemFromCart=function(productId){
    const updatedCartItems = this.cart.items.filter(item => {
        return item.productId.toString() !== productId.toString();
    }
    );
    this.cart = {
        items: updatedCartItems
    };
    return this.save();
};
module.exports=mongoose.model('User',userSchema);
// const getDb=require('../utils/database').getDb;
// const mongodb=require('mongodb');
// class User
// {
//     constructor(username, email,cart,id)
//     {
//         this.username = username;
//         this.email = email;
//         this.cart = cart ? cart : { items: [] };
//         this._id = id ? id : null;
//     }   
//     save()
//     {
//         const db = getDb();
//         return db.collection('users').insertOne(this);  
//     }

//     static findById(userId)
//     {
//         const db = getDb();
//         return db.collection('users').findOne({_id: new mongodb.ObjectId(userId)});
//     }
//     addToCart(product)
//     {
//        // console.log(this.cart);
//         const cartProductIndex = this.cart.items.findIndex(cp => {
//         return cp.productId.toString() === product._id.toString();
//         }
//         );
//         //console.log(cartProductIndex);
//         //console.log(this);
//         let newQuantity = 1;
//         const updatedCartItems = [...this.cart.items];
//         console.log(updatedCartItems);
//         if (cartProductIndex >= 0) 
//         {
//            newQuantity = this.cart.items[cartProductIndex].quantity + 1;  
//            updatedCartItems[cartProductIndex].quantity = newQuantity; 
//         } 
//         else
//         {
//             updatedCartItems.push({
//             productId: new mongodb.ObjectId(product._id),
//             quantity: newQuantity
//         }); 
//         }
//         const updatedCart = {
//             items: updatedCartItems
//         };  
//         const db = getDb();
//         return db.collection('users').updateOne(
//         { _id: new mongodb.ObjectId(this._id) },
//         { $set: { cart: updatedCart } }
//         );
//     }   
//     getCart()
//     {
//         const db = getDb();
//         const productIds = this.cart.items.map(i => {
//         return i.productId;
//         }   
//         );
//         console.log("ids",productIds);
//         return db.collection('products').find({ _id: { $in: productIds } }).toArray()
//         .then(products => {
//             console.log("getCart",products);
//         return products.map(p => {
//             return {
//             ...p,
//             quantity: this.cart.items.find(i => {
//                 return i.productId.toString() === p._id.toString();
//             }).quantity
//             };
//         }
//         );
//         }       
//         ).catch(err => {
//         console.log(err);
//         }        );             

//     }   
//     deleteItemFromCart(productId)
//     {
//         const updatedCartItems = this.cart.items.filter(item => {
//         return item.productId.toString() !== productId.toString();
//         });
//         const db = getDb();
//         return db.collection('users').updateOne(
//         { _id: new mongodb.ObjectId(this._id) },
//         { $set: { cart: { items: updatedCartItems } } }
//         );
//     }   
//     addOrder()
//     {
//         //we dont need to add order collection as we can fetch orders from user collection itself
//         const db = getDb(); 
//        return this.getCart()
//         .then(products => { 
//           console.log("pro",products);
//             const order = {                     
//                 items: products,      
//             user: {
//                 _id: new mongodb.ObjectId(this._id),
//                 username: this.username
//             }
//             };
//             return db.collection('orders').insertOne(order) 
//                 .then(result => {
                
//                                 this.cart = { items: [] };
//                                 return db.collection('users').updateOne(
//                             { _id: new mongodb.ObjectId(this._id) },
//                             { $set: { cart: { items: [] } } }
//                             );
//                 })
//                 .catch(err => 
//                 {
//                 console.log(err);         
//                 });
//                 })
//     }
//     getOrders()
//     {
//         const db = getDb();
//         return db.collection('orders').find({ 'user._id': new mongodb.ObjectId(this._id) }).toArray();
//     }

// }
// module.exports=User;