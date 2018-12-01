var db = require('./db');
db.initCollection('users');

module.exports = {
    createUser: createUser,
    deleteUser: deleteUser,
    getUser: getUser
};

function createUser(req, res) {
    try {
        var User = {
            username: req.body.username,
            password: req.body.password,
        };
        if(User.balance == null ){
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