var db = require('./db');
db.initCollection('users');
db.initCollection('sessionIDs');


module.exports = {
    login: login,
    logout: logout
};

function login(req, res) {
    try {
        var users = db.getObjects('users', {});
        var credentials = {
            username: req.body.username,
            password: req.body.password
        };

        var x = db.getObject('users', credentials);
        var y = {
            user: x         
        }
        var z = db.createObject('sessionIDs', y);

        return res.json(z._id);
    } catch (error) {
        return res.send(400, {
            message: error.message
        });
    }
}

function logout(req, res) {
    try {
        var users = db.getObjects('users', {});
        
        var xsessionid = {
            xsessionid: users.sessionIDs
        };
        var x = db.getObject('users', xsessionid);
        return res.json(xsessionid);
    } catch (error) {
        return res.send(400, {
            message: error.message
        });
    }
}