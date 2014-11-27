// get information
exports.getTracks = function (callback) {
    var http = require('https');
    //var musicType = "progressive%20house";
    /*var body = JSON.stringify({
        'genres': 'hiphop',
    });*/
	var options = {
    	host: 'api.soundcloud.com',
    	port: 443,
        path: '/tracks/?client_id=0e2f4290ff93af6c624a9a7c52526231&limit=5&sort=hottest&genres=',
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

                //var songUrl = JSON.parse(str);
                callback(str);
            	//console.log(songUrl.permalink_url);
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

exports.getSameMusic = function (typeOfMusic, callback) {
    var http = require('https');
    var musicType = typeOfMusic;
    /*var body = JSON.stringify({
        'genres': 'hiphop',
    });*/
    var options = {
        host: 'api.soundcloud.com',
        port: 443,
        path: '/tracks/?client_id=0e2f4290ff93af6c624a9a7c52526231&limit=5&sort=hottest&genres='+musicType,
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
               

                //var songUrl = JSON.parse(str);
                callback(str);
                //console.log(songUrl.permalink_url);
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