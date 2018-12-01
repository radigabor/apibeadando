var db = require('./db');
db.initCollection('users');


module.exports = {
    getBalance: getBalance,
    updateBalance: updateBalance
};

function getBalance(req, res) {
    try {
        var user_balance = req.params.username;
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
        
        var updated_user = db.getObject('users', username);
        updated_user[0].balance += amount;             

        db.updateObject('users', username, updated_user);
        var x = db.getObjects('users', username);
        return res.json(x);
    } catch (error) {
        return res.send(400, {
            message: error.message
        });
    }
  }
  
