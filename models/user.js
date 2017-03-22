var db = require('../models/db');
var schemas = require("../models/schemas.js");  
var _ = require("lodash");

var User = function (data) {  
  this.data = this.sanitize(data);
};

User.prototype.data = {};

User.prototype.sanitize = function (data) {  
  data = data || {};
  schema = schemas.user;
  return _.pick(_.defaults(data, schema), _.keys(schema)); 
};

User.prototype.get = function (name) {  
  return this.data[name];
};

User.prototype.set = function (name, value) {  
  this.data[name] = value;
};

User.findByKey = function (key, callback) {  
  db.myBucket.get(key, function (err, data) {
    if (err) return callback(err);
    callback(null, new User(data.value));
  });
};

User.prototype.save = function (callback) {  
  var self = this;
  this.data = this.sanitize(this.data);
  db.myBucket.upsert(this.data.key, this.data, function (err, result) {
    if (err) return callback(err);
    callback(null, self); 
  });
};

module.exports = User;