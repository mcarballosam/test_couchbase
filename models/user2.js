var model = require('nodejs-model');

var User2 = model("User2").attr('key', {
  validations: {
    presence: {
      message: 'key is mandatory'
    }
  }
}).attr('name', {
  validations: {
    presence: {
      message: 'Name is mandatory'
    }
  }
}).attr('email', {
  validations: {
  	presence: {
      message: 'Name is mandatory'
    },
  	format: { 
  		with: /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i, 
  		message: 'invalid email'
  	},
    length: {
      minimum: 3,
      maximum: 20,
      messages: {
        tooShort: 'email is too short',
        tooLong: 'email is too long'
      }
    }
  }
});

module.exports.User2 = User2;