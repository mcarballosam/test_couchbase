// Get the packages we need
var express = require('express');
var bodyParser = require('body-parser');
var userController = require('./controllers/user');
var user2Controller = require('./controllers/user2');
var session = require('cookie-session');
var ejs = require('ejs');

//servers
var http = require('http');
var fs = require('fs');

// Create our Express application
var app = express();
app.use(express.static(__dirname + '../public'));

// Set view engine to ejs
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

// Create our Express router
var router = express.Router();
// Use express session support since OAuth2orize requires it
var expiryDate = new Date( Date.now() + 60 * 60 * 1000 ); // 1 hour
app.use(session({
  name: 'session',
  secret: 'Sf43%$fdswe187xFFfd$1',
  cookie: { secure: true,
            httpOnly: true,
            expires: expiryDate
          }
  })
);

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    res.header('Access-Control-Allow-Methods', 'POST, GET, PUT, DELETE, OPTIONS');
    next();
});

// Create endpoint handlers for /users
router.route('/users')
        .post(userController.postUsers);
//create endpoint for users/:key
router.route('/users/:key')
        .get(userController.getUser)
        .put(userController.putUser);

// Create endpoint handlers for /users
router.route('/users2')
        .post(user2Controller.postUsers);
//create endpoint for users/:key
router.route('/users2/:key')
        .get(user2Controller.getUser)
        .put(user2Controller.putUser);

// Register all routes with /api
app.use('/api', router);

//ERROR handling
app.use(function (err, req, res, next) {
    res.status(err.status || 500);
    var dataObj = JSON.stringify({
        success: false,
        message: err.message,
        error: err
    });
    return res.render('error', {info: dataObj});
});


// Create an HTTP service.
http.createServer(app).listen(3000);