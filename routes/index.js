var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/:key', function(req, res) {
    

	// check if the user's credentials are saved in a cookie //
		if (req.cookies.user == undefined || req.cookies.pass == undefined){

			res.render('login', { title: 'Hello - Please Login To Your Account' });
		}

		else {
			res.render('index', { title: 'Supreme Banana Station' });
		}
  
});

router.post('/:key', function(req, res){

    if (req.params.key == "banana"){

            var username = req.body.user;
            var password = req.body.pass;
            if (username != "shaohaolinca@gmail.com") {

                res.render('login', { error: 'Invalid User Name or Password.'});
            }

            if (password != "hello") {

                res.render('login', { error: 'Invalid User Name or Password.'});
            }

            else{

                res.render('index', {   title: 'Supreme Banana Station',
                                    username: 'Shaohao',
                                    });
             }
        }
        else {
             res.send(   "{'Incorrect Key!'} " );
        }

});

module.exports = router;
