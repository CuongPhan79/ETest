var localStrategy = require('passport-local').Strategy;
var facebookStrategy = require('passport-facebook').Strategy;
var googleStrategy = require('passport-google-oauth').OAuth2Strategy;

var User = require('../app/models/user');

var social_Config = require('./auth');

module.exports = function(passport)
{
    //used to serialize the user for the session
    passport.serializeUser(function(user,done){
        done(null,user.id);
    });

    //used to deserialize the user
    passport.deserializeUser(function(id,done){
        User.findById(id, function(err,user){
            done(err,user);
        });
    });
    

    //==========================LOCAL LOGIN===================
    passport.use('local-login', new localStrategy({
        usernameField : 'email',
        passwordField: 'password',
        passReqToCallback : true  // pass back the entire request to callback
    },
    function(req,email, password, done){
        User.findOne({'local.email' : email}, function(err,user){
            if(err)
            {
                return done(err);
            }
            if (!user) {
                return done(null, false, {
                  message: 'User not found'
                });
            }
            if (!user.validPassword(password))
            return done(null, false, req.flash('loginMessage', 'Oops! Wrong password.')); // create the loginMessage and save it to session as flashdata
            //console.log(user);
            // all is well, return successful user
            return done(null, user);

        });
    }));

    //=====================LOCAL SIGNUP==========================
    passport.use('local-register', new localStrategy({
        usernameField : 'email',
        passwordField : 'password',
        passReqToCallback: true
    },
    function(req,email,password,done){
        process.nextTick(function(){
            User.findOne({'local.email' : email} , function(err,user){
                if(err)
                {
                    return done(err);
                }
                if(user)
                {
                    return done(null, false, req.flash('registerMessage', 'Email is already existed.'));
                }
                else
                {
                    var telephoneNumber = req.body.telephoneNumber;
                    var role = "member";
                    var name = req.body.name;
                    var newUser = new User();
                    newUser.local.telephoneNumber = telephoneNumber;
                    newUser.local.email = email;
                    newUser.local.name = name;
                    newUser.local.role = role;
                    newUser.local.password = newUser.generateHash(password);
                    console.log(newUser);
                    newUser.save(function(err){
                        if(err)
                        {
                            throw err;
                        }
                        else
                        {
                            return done(null, newUser);
                        }
                    });
                }
            });
        });
    }));

    //====================FACEBOOK LOGIN===========================
    passport.use(new facebookStrategy({
        clientID: social_Config.facebookAuth.clientID,
        clientSecret :social_Config.facebookAuth.clientSecret,
        callbackURL : social_Config.facebookAuth.callbackURL
    },
    function(token, refreshToken, profile, done){
        process.nextTick(function(){
            User.findOne({'facebook.id' : profile.id}, function(err,user){
                if(err)
                {
                    return done(err);
                }
                if(user)
                {
                    console.log('this is old User, sign in');
                    console.log(user);
                    return done(null,user);
                }
                else
                {
                    console.log('this is new User, create new');
                    console.log(profile);
                    var newUser = new User();
                    newUser.facebook.id = profile.id;
                    newUser.facebook.token = token;
                    newUser.facebook.name =  profile.displayName;
                    console.log(profile._json.email == undefined);
                    if(profile._json.email == undefined)
                    {
                        //newUser.facebook.email = profile.emails[0].value;
                        newUser.facebook.email = profile._json.email;
                    }
                    //console.log(newUser);
                    newUser.save(function(req,res, err){
                        if(err)
                        {
                          throw err;
                        }
                        return done(null,newUser);
                      });
                }
            });
        });
    }
    ));
    //=====================GOOGLE SIGNUP===================================
    passport.use(new googleStrategy({
        clientID: social_Config.googleAuth.clientID,
        clientSecret: social_Config.googleAuth.clientSecret,
        callbackURL : social_Config.googleAuth.callbackURL 
    }, function(token, refreshToken, profile, done){
        //asynchronous
        process.nextTick(function(){
            User.findOne({'google.id': profile.id}, function(err,user){
                if(err)
                {
                    return done(err);
                }
                if(user)
                {
                    return done(null, user);
                }
                else
                {
                    var newUser = new User();
                    newUser.google.id = profile.id;
                    newUser.google.token = token;
                    newUser.google.name = profile.displayName;
                    newUser.google.email  = profile.emails[0].value;

                    newUser.save(function(err){
                        if(err)
                        {
                            throw err;
                        }
                        return done(null,newUser);
                    })
                }
            })
        })
    }));
}