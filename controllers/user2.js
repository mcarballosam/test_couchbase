// Load required packages
var User2 = require('../models/user2');
var db = require('../models/db');

// Create endpoint /api/users for POST
exports.postUsers = function (req, res, next) {

    var newUser = User2.User2.create();
    newUser.key(req.body.email);
    newUser.name(req.body.name);
    newUser.email(req.body.email);

    newUser.validate().then(function() {
      if (newUser.isValid) {
          return res.json(newUser);
      } else {
         return res.json(newUser.errors);
      }
    });

    
};