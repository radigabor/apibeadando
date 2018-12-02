var db = require('./db');
db.initCollection('products');

module.exports = {
    createProduct: createProduct,
    deleteProduct: deleteProduct,
    getProducts: getProducts,
    findProduct: findProduct,
    placeOrder: placeOrder
};

function createProduct(req, res) {
    try {
        var Product = {
            name: req.body.name,
            cost: req.body.cost
        };
        var x = db.createObject('products', Product);
        return res.json(x._id);
    } catch (error) {
        return res.send(400, {
            message: error.message
        });
    }
  }
  
function placeOrder(req, res){
    try {
        var d = new Date();
        var Order = {
            username : req.body.username,
            product : req.body.product,
            date : d
        };
        console.log("Order", Order)
        var x = db.createObject('products', Order);
        return res.json(x._id);
    } catch (error) {
        return res.send(400, {
            message: error.message
        });
    }
    
}
  
function deleteProduct(req, res) {
    try {
        
        db.deleteObject('products', product);
        var x = db.getObjects('products');
        return res.json(x);
    } catch (error) {
        return res.send(400, {
            message: error.message
        });
    }
  }
  
function getProducts(req, res) {
    try {        
        var x = db.getObjects('products');
        return res.json(x);
    } catch (error) {
        return res.send(400, {
            message: error.message
        });
    }
  }
  
function findProduct(req, res) {
    try {        
        var productName = req.params.productName;
        var x = db.getObject('products', productName);
        return res.json(x);
    } catch (error) {
        return res.send(400, {
            message: error.message
        });
    }
  }