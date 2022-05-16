const db = require('../models');
const express = require('express');
const passport = require('../config/ppConfig.js');
const router = express.Router();

router.get('/signup', (req, res) => {
     const locals = {
          title: 'Register For An Account',
          description: null,
          style: '/css/signup.css',
     };
     res.render('auth/signup', { meta: locals });
});

router.post('/signup', (req, res) => {
     db.user
          .findOrCreate({
               where: {
                    username: req.body.username,
                    password: req.body.password,
                    email: req.body.email,
                    firstName: req.body.firstName,
                    lastName: req.body.lastName,
               },
          })
          .then(([user, created]) => {
               // If created, this means success, redirect to home.
               if (created) {
                    passport.authenticate('local', {
                         successRedirect: '/',
                         successFlash: 'Account created and user logged in!',
                    })(req, res);
               } else {
                    req.flash('error', 'Email already exists!');
                    res.redirect('/auth/signup');
               }
          })
          .catch(err => {
               req.flash('error', err.message);
               res.redirect('/auth/signup');
          });
});

router.get('/login', (req, res) => {
     const locals = {
          title: 'Login',
          description: null,
          style: '/css/login.css',
     };
     res.render('auth/login', { meta: locals });
});

router.post(
     '/login',
     passport.authenticate('local', {
          successRedirect: '/',
          failureRedirect: '/auth/login',
          failureFlash: 'Invalid username or password',
          successFlash: 'You have logged in!',
     })
);

router.get('/logout', (req, res) => {
     const locals = {
          title: 'Login',
          description: null,
     };

     req.logout();
     req.flash('success', 'You have logged out');
     res.redirect('/');
});

module.exports = router;
