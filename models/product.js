const getDb=require('../utils/database').getDb;
const mongodb=require('mongodb');
class Product{
    constructor(title,price,description,imageUrl,id,userId){
        this.title=title;   
        this.price=price;
        this.description=description;
        this.imageUrl=imageUrl;
        this._id=id?id:null;
        this.userId=userId;
    }
    save(){
       const db = getDb();
            let dbOp;
            if (this._id) {
                const { _id, ...updatedProduct} = this;
                dbOp = db.collection('products').updateOne(
                { _id: new mongodb.ObjectId(_id)},
                { $set: updatedProduct}
                );
            } else {
                dbOp = db.collection('products').insertOne(this);
            }
   
         return dbOp.then(result=>{
            console.log(result);
            return result;
        })
        .catch(err=>{
            console.log(err);
            throw err;
        });     

    }   
    static fetchAll(){
        const db=getDb();
        return db
        .collection('products')
        .find()
        .toArray().then(products=>{
            return products;
        })
        .catch(err=>{
            console.log(err);
            throw err;
        });
    }
    static findById(productId){ 
        const db=getDb();
        return db
        .collection('products')
        .find({_id:new mongodb.ObjectId(productId)})
        .next()
        .then(product=>{
            return product;
        })
        .catch(err=>{
            console.log(err);
            throw err;
        });
    }  
    static deleteById(productId){
        const db=getDb();   
        return db
        .collection('products')
        .deleteOne({_id:new mongodb.ObjectId(productId)})
        .then(result=>{
            console.log('Deleted Product');
            return result;
        })
        .catch(err=>{
            console.log(err);
            throw err;
        });
    }
}           
module.exports=Product;