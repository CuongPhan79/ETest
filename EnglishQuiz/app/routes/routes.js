
let user = require('../models/user');
module.exports = function (app, passport) {

    //====================================================UNAUTHENTICATE ROUTES=========================================================
    //================HOMEPAGE===================
    app.get('/', function (req, res) {
        res.render('index.ejs');
    });

    //==================LOGIN====================
    app.get('/login', function (req, res) {
        res.render('login.ejs', { message: req.flash('loginMessage') });
    });
    // app.post('/login', passport.authenticate('local-login', {
    //     successRedirect: '/profilelocal',
    //     failureRedirect: '/',
    //     failureFlash: true
    // }));
    app.post('/login', function(req, res){
        //console.log(req.body);
        passport.authenticate('local-login', function(err, user, info){
            var token;
            // Nếu có error
            console.log(res);
            if (err) {
            res.status(404).json(err);
                return;
            }
            // Tìm thấy user
            if(user){
            token = user.generateJwt();
            console.log(token)
            res.status(200);
            res.json({
                token
            });
            } else {
            // Không tìm thấy user
            res.status(401).json(info);
            }
        })(req, res);
    });
    app.get('/profilelocal', async function (req, res) {
        console.log(req.headers.authorization)
        if (!req.headers.authorization) {
            res.status(401).json({
              "message" : "UnauthorizedError: private profile"
            });
        } else {
        user
            .findById(req.headers.authorization)
            .exec(function(err, user) {
                console.log(user)
            res.status(200).json(user);
            });
        }
    });
    /// Register
    app.get('/register', function (req, res) {
        res.render('register.ejs', { message: req.flash('registerMessage') });
    });
    // app.post('/register', passport.authenticate('local-register', {
    //     successRedirect: '/profilelocal',
    //     failureRedirect: '/register',
    //     failureFlash: true
    // }));
    //=================SIGNUP=====================
    app.get('/signup', function (req, res) {
        res.render('signup.ejs', { message: req.flash('signupMessage') });
    });
    app.post('/signup', passport.authenticate('local-signup', {
        successRedirect: '/profilelocal',
        failureRedirect: '/signup',
        failureFlash: true
    }));
    app.post('/register', function(req, res){
        passport.authenticate('local-register', function(err, user, info){
            var token;
            console.log("sss");
            // Nếu có error
            console.log(res);
            if (err) {
            res.status(404).json(err);
                return;
            }
            // Tìm thấy user
            if(user){
            token = user.generateJwt();
            console.log(token)
            res.status(200);
            res.json({
                token
            });
            } else {
            // Không tìm thấy user
            res.status(401).json(info);
            }
        })(req, res);
    });
    //================FACEBOOK====================
    app.get('/auth/facebook', passport.authenticate('facebook', { scope: 'email' }));
    app.get('/auth/facebook/callback', passport.authenticate('facebook', {
        successRedirect: '/profilefacebook',
        failureRedirect: '/'
    }));
    //=================GOOGLE=====================
    app.get('/auth/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

    app.get('/auth/google/callback', passport.authenticate('google', {
        successRedirect: '/profilegoogle',
        failureRedirect: '/'
    }));
    //================LOGOUT======================
    app.get('/logout', function (req, res) {
        req.logout();
        res.redirect('/');
    });
  
    //=======================================================AUTHENTICATE ROUTES============================================================
    //=================PROFILE====================

    //profile local
    app.get('/profilelocal', isLoggedIn, async function (req, res) {
        console.log(req.user);
        res.render('profile/LoginLocal.ejs', { user: req.user });

    });
    //profile facebook
    app.get('/profilefacebook', isLoggedIn, async function (req, res) {
        console.log(req.user);
        res.render('profile/LoginFacebook.ejs', { user: req.user });

    });
    //profile google
    app.get('/profilegoogle', isLoggedIn, async function (req, res) {
        console.log(req.user);
        res.render('profile/LoginGoogle.ejs', { user: req.user });

    });


    // app.get('/profile', isLoggedIn, async function (req, res) {
    //     console.log(req.user);
    //     res.render('profile.ejs', { user: req.user });

    // });


    function isLoggedIn(req, res, next) {
        if (req.isAuthenticated()) {
            console.log('already login');
            return next();
        }
        else {
            console.log('not login yet');
            res.redirect('/');
        }
    }

}