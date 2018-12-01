var db = require('./db');
db.initCollection('users');

module.exports = {
    createUser: createUser,
    deleteUser: deleteUser,
    getUser: getUser,
    getBalance: getBalance,
    updateBalance: updateBalance
};

function createUser(req, res) {
    try {
        console.log("szar fos");

        var User = {
            username: req.body.username,
            password: req.body.password,
        };
        if(req.body.balance != null || req.body.balance != ""){
            User.balance = req.body.balance;
        }else {
            User.balance = 0;
        }
        var x = db.createObject('users', User);
        return res.json(x._id);
    } catch (error) {
        return res.send(400, {
            message: error.message
        });
    }
  }
  
function deleteUser(req, res) {
    try {
        var User = {
            username: req.body.username,
            password: req.body.password
        };
        var x = db.deleteObject('users', User);
        return res.json(x._id);
    } catch (error) {
        return res.send(400, {
            message: error.message
        });
    }
  }
  
function getUser(req, res) {
    try {        
        var x = db.getObjects('users');
        return res.json(x);
    } catch (error) {
        return res.send(400, {
            message: error.message
        });
    }
  }
  
function getBalance(req, res) {
    try {
        var user_balance = req.body.username;
        var x = db.getObject('users', user_balance);
        return res.json(x);
    } catch (error) {
        return res.send(400, {
            message: error.message
        });
    }
  }
  
function updateBalance(req, res) {
    try {
        console.log("sya");
        var username = req.body.username;
        var amount = req.body.amount;
        
        updated_user = db.getObject('users', {});

        console.log("username", updated_user);
        
        var User = {
            username: updated_user.username,
            password: updated_user.password,
            balance: updated_user.balance + amount
        };
        console.log("sya1.1: ", User.username);
        console.log("sya1.1: ", User.password);
        console.log("sya1.2:", User.balance);
        console.log("sya1");
        db.updateObject('users',{username:username}, User)
        updated_user = db.getObject('users', {username:username});
        console.log("username", updated_user);
        console.log("sya2");
        return res.json(updated_user);
    } catch (error) {
        return res.send(400, {
            message: error.message
        });
    }
  }