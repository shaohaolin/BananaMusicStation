var express = require('express');
var router = express.Router();

/*
 * GET musiclist.
 */
router.get('/musiclist', function(req, res) {
    var db = req.db;
    db.collection('commentcollection').find().toArray(function (err, items) {
        res.json(items);
    });
});

module.exports = router;
