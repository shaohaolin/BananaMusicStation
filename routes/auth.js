//verification code
exports.getConnectionCode = function (callback) {
    var http = require('https');
    /*var body = JSON.stringify({
        'genres': 'hiphop',
    });*/
	var options = {
    	host: 'soundcloud.com',
    	port: 443,
        path: '/connect?client_id=0e2f4290ff93af6c624a9a7c52526231&redirect_uri=http://104.131.97.125:8380&response_type=code&scope=non-expiring',
            //query: qs,
            method: 'GET',
            headers: {
                'Accept':'application/json',
            }
            //msgbody: body
    	};

    	var post_req = http.request(options, function(res){
        	var str = '';
        	//Set the encoding of the response to UTF8
        	res.setEncoding('utf8');
        	//Chunks of data being received
        	res.on('data', function(chunk){
            	//Append this chunk of data to str
                    str += chunk;
        	});
        	//Response received - end event
        	res.on('end', function (data) {
         
                callback(str);
            	
                //callback(songUrl);
        	});
        	//Error case
        	res.on('error', function(e){
            	//Return the error to the callback function
            	console.log("error");
            	//return throw(e);
        	});
    	});
    	post_req.on('error', function(err) {
    	console.log("new error "+ err);// Handle error
	});
	post_req.end();
};

//obtainRequestToken
exports.obtainRequestToken = function (req, callback) {
	res.send(req);
    var http = require('https');
    /*var body = JSON.stringify({
        'genres': 'hiphop',
    });*/
	var options = {
    	host: 'soundcloud.com',
    	port: 443,
        path: '/connect?client_id=0e2f4290ff93af6c624a9a7c52526231&redirect_uri=http://104.131.97.125:8380&response_type=code&scope=non-expiring',
            //query: qs,
            method: 'POST',
            headers: {
                'Accept':'application/json',
            }
            //msgbody: body
    	};

    	var post_req = http.request(options, function(res){
        	var str = '';
        	//Set the encoding of the response to UTF8
        	res.setEncoding('utf8');
        	//Chunks of data being received
        	res.on('data', function(chunk){
            	//Append this chunk of data to str
                    str += chunk;
        	});
        	//Response received - end event
        	res.on('end', function (data) {
           
                callback(str);
            	
                //callback(songUrl);
        	});
        	//Error case
        	res.on('error', function(e){
            	//Return the error to the callback function
            	console.log("error");
            	//return throw(e);
        	});
    	});
    	post_req.on('error', function(err) {
    	console.log("new error "+ err);// Handle error
	});
	post_req.end();
};