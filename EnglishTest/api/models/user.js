var mongoose =require('mongoose');
var Schema=mongoose.Schema;
var bcrypt=require('bcrypt-nodejs');
const crypto = require('crypto');
const jwt = require('jsonwebtoken');

var User = new Schema({
    name:String,
    username:{type:String ,require:true,index:{unique:true}},
    password:{type:String,require:true,select:false},
    salt: String,
}, {
    collection: 'users'
 });

User.pre('save',function(next){
    var user=this;

    if(!user.isModified('password')) return next();
    bcrypt.hash(user.password,null,null,function(err,hash){
        if(err) return next(err);
        user.password=hash;
        next();
    });
});

User.methods.comparePassword=function(password){
    var user=this;
    return bcrypt.compareSync(password,user.password);
};
module.exports=mongoose.model('User',User);