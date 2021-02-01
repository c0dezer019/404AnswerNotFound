/* eslint-disable prettier/prettier */
require('dotenv').config();
const cookieParser = require('cookie-parser');
const db = require('./models');
const express = require('express');
const flash = require('connect-flash');
const layouts = require('express-ejs-layouts');
const methodOverride = require('method-override');
const passport = require('./config/ppConfig.js');
const session = require('express-session');
const app = express();

app.set('view engine', 'ejs');

// Middleware
app.use(require('morgan')('dev'));
app.use(
     express.urlencoded({
          extended: false,
     })
);

app.use(express.static(__dirname + '/public'));
app.use(layouts);
app.use(methodOverride('_method'));

// Session config
app.use(cookieParser());

app.use(
     session({
          secret: 'secret',
          resave: false,
          saveUninitialized: true,
          cookie: {
               sameSite: 'strict',
          },
     })
);

app.use(flash());

app.use(passport.initialize());
app.use(passport.session());

app.use((req, res, next) => {
     res.locals.alerts = req.flash();
     res.locals.currentUser = req.user;
     next();
});

// Routes

app.get('/', (req, res) => {
     const locals = {
          title: '404AnswersNotFound',
          description: 'Where answers are not found, but found.',
          style: '/css/home.css',
          isUserLoggedIn: false,
     };
     locals.isUserLoggedIn = !!req.user;

     db.question.findAll({ limit: 3 }).then(question => {
          db.answer
               .findAll({ limit: 3 })
               .then(answer => {
                    db.category
                         .findAll()
                         .then(category => {
                              res.render('home', {
                                   meta: locals,
                                   questions: question,
                                   answers: answer,
                                   cat: category,
                              });
                         })
                         .catch(err => {
                              console.log(err);
                         });
               })
               .catch(err => {
                    console.log(err);
               });
     });
});

app.use('/auth', require('./controllers/auth'));
app.use('/inquire', require('./controllers/inquire'));
app.use('/profile', require('./controllers/profiles'));

const server = app.listen(process.env.PORT || 8000, () =>
     console.log(
          `🎧You're listening to the smooth sounds of port ${
               process.env.PORT || 8000
          }🎧`
     )
);

module.exports = server;
