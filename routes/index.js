var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {

	// check if the user's credentials are saved in a cookie //
		if (req.cookies.user == undefined || req.cookies.pass == undefined){
			res.render('login', { title: 'Hello - Please Login To Your Account' });
		}

		else {
			res.render('index', { title: 'Supreme Banana Station' });
		}
  
});

router.post('/', function(req, res){

	var username = req.body.user;
    var password = req.body.pass;
    if (username != "shaohaolinca@gmail.com") {

        res.render('login', { error: 'Invalid User Name.'});
    }

    if (password != "hello") {

        res.render('login', { error: 'Invalid Password.'});
    }

    else{

        res.render('index', {   title: 'Supreme Banana Station',
                            username: 'Shaohao',
                            });
    }
});

module.exports = router;
