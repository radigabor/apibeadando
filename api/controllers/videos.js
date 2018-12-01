var db = require('./db');

db.initCollection('videos');

module.exports = {
    findVideo: findVideo
};

function findVideo(req, res) {
    try {
        var results = db.getObjects('videos', {});
        return res.json(results);
    } catch (error) {
        return res.send(400, {
            message: error.message
        });
    }
  }