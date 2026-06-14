const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const db = require('../models');

/*
 *
 * Passport serializes objects to them easier to store.
 * Converts user to an identifier
 *
 */
passport.serializeUser((user, cb) => {
  cb(null, user.id);
});

/*
 *
 * Passport deserializes objects by taking user id and looks it up in the database.
 *
 */
passport.deserializeUser((id, cb) => {
  db.user
    .findByPk(id)
    .then((user) => {
      cb(null, user);
    })
    .catch(cb);
});

/*
 * This is Passport's strategy to provide local authentication. We provide the
 * following information to the LocalStrategy:
 *
 * Configuration: An object of data to identify our authentication fields, the
 * username and password
 *
 * Callback function: A function that's called to log the user in. We can pass
 * the email and password to a database query, and return the appropriate
 * information in the callback. Think of "cb" as a function that'll later look
 * like this:
 *
 * login(error, user) {
 *   // do stuff
 * }
 *
 * We need to provide the error as the first argument, and the user as the
 * second argument. We can provide "null" if there's no error, or "false" if
 * there's no user.
 */
passport.use(
  new LocalStrategy(
    {
      usernameField: 'username',
      passwordField: 'password',
    },
    (username, password, cb) => {
      // find the user in the db with their email
      db.user
        .findOne({
          where: { username },
        })
        .then((user) => {
          if (!user || !user.validPassword(password)) {
            cb(null, false);
          } else {
            cb(null, user);
          }
        })
        .catch(cb);
    }
  )
);

module.exports = passport;
