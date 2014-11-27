var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {

	// check if the user's credentials are saved in a cookie //
		/*if (req.cookies.user == undefined || req.cookies.pass == undefined){
			res.render('login', { title: 'Hello - Please Login To Your Account' });
		}

		else {*/
			res.render('index', { title: 'Supreme Banana Station' });
		//}
  
});

module.exports = router;
