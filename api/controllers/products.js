var db = require('./db');
db.initCollection('products');
db.initCollection('transactions');
db.initCollection('users');

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

function placeOrder(req, res) {
    try {
        var d = new Date();
        var Order = {
            username: req.body.username,
            product: req.body.product,
        }
        var product = db.getObject('products', { name: Order.product });
        var user = db.getObject('users', { username: Order.username })
        console.log("szia megtalaltam mindent")
        if (product.cost > user.balance) {
            const response = "Not enough money";
            return res.status(400).send(response);
        } else {
            console.log("szia van penzem")
            var Transaction = {
                username: user.username,
                product: product.name,
                cost: product.cost,
                date: d
            }
            var x = db.createObject('transactions', Transaction)
            var z = db.getObject('transactions', { username: Transaction.username })
            const response = "Succesfully created transaction";
            return res.status(200).json(z);
        }
    } catch (error) {
        return res.status(400).send(error.message);
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