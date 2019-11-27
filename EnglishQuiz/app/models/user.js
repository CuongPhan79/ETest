var mongoose = require('mongoose');
var bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');
var userSchema = mongoose.Schema({
    local : {
        name: String,
        telephoneNumber : String,
        email : String,
        password: String,
        role : String
    },
    facebook  : {
        id : String,
        token : String, 
        email : String,
        name : String
    },
    google : {
        id: String,
        token : String,
        email : String,
        name : String,
    }
});
userSchema.methods.validPassword = function(password){
    return bcrypt.compareSync(password, this.local.password);
};

userSchema.methods.generateHash = function(password){
   return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};
userSchema.methods.generateJwt = function() {
    var expiry = new Date();
    expiry.setDate(expiry.getDate() + 7);
  
    return jwt.sign({
      _id: this._id,
      email: this.email,
      name: this.name,
      exp: parseInt(expiry.getTime() / 1000),
    }, "MY_SECRET"); 
};

module.exports = mongoose.model('UserDB', userSchema);