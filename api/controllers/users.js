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
        var username = req.body.username;
        var amount = req.body.amount;
        
        old_user = db.getObject('users', {username:username});
        
        var User = {
            username: old_user.username,
            password: old_user.password,
            balance: old_user.balance + amount
        };        
        db.updateObject('users',{username:username}, User)
        updated_user = db.getObject('users', {username:username});
        return res.json(updated_user);
    } catch (error) {
        return res.send(400, {
            message: error.message
        });
    }
  }