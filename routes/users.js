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


/*
 * POST to addcomment.
 */
router.post('/addcomment', function(req, res) {
    var db = req.db;
    db.collection('commentcollection').insert(req.body, function(err, result){
        res.send(
            (err === null) ? { msg: '' } : { msg: err }
        );
    });
});

module.exports = router;
