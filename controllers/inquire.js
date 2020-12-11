const db = require('../models');
const express = require('express');
const isLoggedIn = require('../middleware/isLoggedIn');
const passport = require('../config/ppConfig.js');
const router = express.Router();

router.use(passport.initialize());
router.use(passport.session());
router.use(
     express.urlencoded({
          extended: false,
     })
);
router.use((req, res, next) => {
     res.locals.alerts = req.flash();
     res.locals.currentUser = req.user;
     next();
});


/*=============================================
=            Add inquisition to Database      =
=============================================*/

router.post('/create/inquisition', (req, res) => {
     // Should redirect to the /inquiry/:id route below, showing the newly created inquisition.
     if(req.user) {
          db.question
               .create({
                    createdBy: req.user.dataValues.username,
                    summary: req.body.summary,
                    details: req.body.details,
               })
               .then(question => {
                    res.redirect('/');
               })
               .catch(err => {
                    console.log(err);
                    db.bug.create({
                         error: `${err}`,
                         location: 'create_inquisition_route',
                         activity: `Creating inquisition`,
                         user: req.user.dataValues.username,
                         status: 'Untracked',
                    });
               });
     } else {
          res.redirect('/auth/login');
     }
});


/*=============================================
=            Create an inquisition form       =
=============================================*/

router.get('/create/inquisition', isLoggedIn, (req, res) => {
     const locals = {
          title: 'Make an inquisition',
          description: null,
          style: '/css/inquisition.css',
     };
     
     res.render('inquire/inquisition', { meta: locals, data: req.query.quickPost });
});


/*=============================================
=            Edit an inquisition              =
=============================================*/

router.put('/:idx', (req, res) => {
     db.question.update(
          {
               summary: req.body.summary,
               details: req.body.details,
          },
          {
               where: {
                    id: req.params.idx,
               },
          }
     );

     res.redirect(`/`);
});


/*=============================================
=            Delete an inquisition            =
=============================================*/

router.delete('/:idx', (req, res) => {
     
     async function destroy(id) {
          const question = await db.question.findOne({
               where: {
                    id: id,
               },
          });
     
          if (question !== null) {
               const answer = await db.answer.findAll({
                    where: {
                         QID: question.dataValues.id,
                    },
               });
     
               if (answer !== null) {
                    await answer.destroy({
                         where: {
                              QID: question.dataValues.id,
                         },
                    });
               }
     
               await question.destroy({
                    where: {
                         id: id,
                    },
               });
          } else {
               db.bug.create({
                    error: `${req.user.dataValues.username} tried to delete a question that doesn't exist in the database`,
     
                    location: 'inquisition_delete_route',
                    activity: 'Deleting a question',
                    user: req.user.dataValues.username,
                    status: 'untracked',
               });
          
          }
     }
     
     destroy(req.params.idx);

     res.redirect('/');
});


/*=============================================
=            View an inquisition              =
=============================================*/

router.get('/inquiry/:id', (req, res) => {
     const locals = {
          title: req.params.id,
          description: req.body.summary,
          style: '/css/inquiry.css',
          isUserLoggedIn: false,
          loggedInUser: null,
     };
     let query;
     let queryRes;
     db.question
          .findOne({
               where: {
                    id: req.params.id,
               },
          })
          .then(question => {
               query = question;
               if (
                    req.user &&
                    req.user.dataValues.username ==
                         question.dataValues.createdBy
               ) {
                    locals.loggedInUser = req.user.dataValues.username;
                    locals.userIsLoggedIn = true;
               } else {
                    console.log('Nope.');
                    locals.userIsLoggedIn = false;
               }

               db.answer
                    .findAll({
                         where: {
                              QID: req.params.id,
                         },
                    })
                    .then(answer => {
                         answer.forEach(el => {
                              if (
                                   req.user &&
                                   req.user.dataValues.username ==
                                        el.dataValues.createdBy
                              ) {
                                   locals.userIsLoggedIn = true;
                              } else {
                                   console.log('Nope.');
                                   locals.userIsLoggedIn = false;
                              }
                         });
                         queryRes = answer;
                         res.render('inquire/inquiry', {
                              meta: locals,
                              data: query,
                              data2: queryRes,
                         });
                    })
                    .catch(err => {
                         console.log(err);
                         db.bug.create({
                              error: `${err}`,
                              location: 'Inquiry_route',
                              activity: `Querying for answers to inquiry ID ${req.params.id}`,
                              user: req.user.dataValues.username,
                              status: 'Untracked',
                         });
                    })
                    .catch(err => {
                         db.bug.create({
                              error: err,
                              location: 'Inquiry_route',
                              activity: `Querying inquiry ID ${req.params.id}`,
                              user: req.user.dataValues.username,
                              status: 'Untracked',
                         });
                    });
          });
});


/*=============================================
=            List of all inquisitions         =
=============================================*/

router.get('/', (req, res) => {
     const locals = {
          summary: req.body.summary,
          content: req.body.content,
          style: '/css/inquisition.css',
     };
     res.render('inquiries', { meta: locals });
});

module.exports = router;
