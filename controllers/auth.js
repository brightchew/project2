var express = require('express');
var db = require('../models');
var passport = require('../config/ppConfig');
var router = express.Router();


router.get('/signup', function(req, res) {
    res.render('auth/signup');
});

router.post('/signup', function(req, res) {
    var email = req.body.email;
    var firstName = req.body.firstName;
    var lastName = req.body.lastName;
    var password = req.body.password;

    db.user.findOrCreate({
        where: { email: email },
        defaults: {
            firstName: firstName,
            lastName: lastName,
            password: password
        }
    }).spread(function(user, created) {
        if (created) {
            passport.authenticate('local', {
                // successRedirect: '/',
                successRedirect: ('/product'),
                successFlash: 'Account created and logged in'
            })(req, res);
        } else {
            req.flash('error', 'Email already exists, please login or reset password');
            res.redirect('/auth/login');
        }
    }).catch(function(error) {
        req.flash('error', error.message);
        res.redirect('/auth/login');
    });
});

router.get('/login', function(req, res) {
    res.render('auth/login' );
});

router.post('/login', passport.authenticate('local', {
    successRedirect: '/product',
    failureRedirect: '/auth/login',
    failureFlash: 'Invalid username and/or password, please login again',
    successFlash: 'You have logged in'
}));


router.get('/logout', function(req, res) {
    req.logout();
    req.flash('success', 'You have logged out');
    res.redirect('/');
});

//password reset
router.get('/passwordReset', function(req, res) {
    res.render('auth/passwordReset');
});

router.post('/passwordReset', function(req, res) {
    console.log(req.body.newPassword2)

    console.log(req.body.newPassword1)

    var email1 = req.body.authEmail;
    var password1 = req.body.newPassword1;
    var password2 = req.body.newPassword2;

    if (password1 === password2) {

        console.log("pasword matches")

    db.user.find({ where: { email: email1 } 
            }).then(function(user) {
                    user.update({
                    password: password1
            }).then(function() {
                    req.flash('success', 'Password reset successfully. Please login again');
                res.redirect('/');
            })

    })

     } else{
            console.log("password not matching")
             req.flash('error', 'password does not match, type again.');
             res.redirect('/auth/passwordReset')
        }


});



module.exports = router;
