var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

// New Code
var mongo = require('mongoskin');
var db = mongo.db("mongodb://localhost:27017/musiclist", {native_parser:true});


var routes = require('./routes/index');
var users = require('./routes/users');
var scPublic = require('./routes/publicInfo');
var authentication = require('./routes/auth');
var app = express();

// view engine setup
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');


// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Make our db accessible to our router
app.use(function(req,res,next){
    req.db = db;
    next();
});

app.use('/', routes);
app.use('/users', users);

app.get('/login', function (req, res) {

    res.render('login');
});

app.post('/login', function (req, res) {

    var username = req.body.user;
    var password = req.body.pass;
    console.log(username);
    console.log(password);

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

app.get('/tracks', function(req, res) {

    scPublic.getTracks(function(tracks) {
        res.send(tracks);
    });
});

app.get('/tracks/:musicType', function(req, res) {
    var _musicType = req.params.musicType;
    scPublic.getSameMusic(_musicType, function(cb){
        res.send(cb);
    });
});

app.get('/auth', function(req,res) {
    authentication.getConnectionCode(function (cb) {
       
       var url = res.send(cb);
       console.log(url.code);
       //authentication.obtainRequestToken
    });
});


// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handlers


// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});

app.listen(8380);
module.exports = app;
