// Load required packages
var User = require('../models/user');
var db = require('../models/db');

// Create endpoint /api/users for POST
exports.postUsers = function (req, res, next) {

    var newUser = new User({key: req.body.email, name: req.body.name, email:req.body.email});

    newUser.save(function(err, response) {
        if(err)
            res.json({success:false, err:err});
        else
            res.json({success:true});
    });
};

//Create endpoint /api/users/:key for GET
exports.getUser = function (req, res, next) {
    User.findByKey(req.params.key, function(err, response){
        if(err)
            res.json({success:false, err:err});
        else
            res.json({success:true, user: response});
    });
};

//Create endpoint /api/users/:key for PUT
exports.putUser = function (req, res, next) {
    
    User.findByKey(req.params.key, function(err, userObj){
        if(err)
            res.json({success:false, err:err});
        else{
            if(req.body.name)
                userObj.set('name', req.body.name);
            if(req.body.name)
                userObj.set('email', req.body.email);
            //save in DB
            userObj.save(function(err, response){
                if(err)
                    res.json({success:false, err:err});
                else
                    res.json({success:true});
            });
        }   
    });
};