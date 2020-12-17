/* eslint-disable no-undef */
const db = require('../models');
const express = require('express');
const passport = require('../config/ppConfig');
const isLoggedIn = require('../middleware/isLoggedIn');
const flash = require('connect-flash');
const router = express.Router();
const multer = require('multer');
const getStream = require('into-stream');
const vaultHandler = require('../config/vaultHandler');
const {
     BlobServiceClient,
     StorageSharedKeyCredential,
     newPipeline,
} = require('@azure/storage-blob');

router.use(flash());

router.use(passport.initialize());
router.use(passport.session());

router.use((req, res, next) => {
     res.locals.alerts = req.flash();
     res.locals.currentUser = req.user;
     next();
});

const ONE_MEGABYTE = 1024 * 1024;
const inMemoryStorage = multer.memoryStorage();
const uploadStrategy = multer({ storage: inMemoryStorage }).single('image');
const uploadOptions = { bufferSize: 4 * ONE_MEGABYTE, maxBuffers: 20 };

let secret;
(async () => {
     secret = await vaultHandler('vault404', 'get', '404BLOBKEY');
})();

let pipeline;
const waitForSecret = () => {
     if (secret !== undefined) {
          const sharedKeyCredential = new StorageSharedKeyCredential('404blob', secret);
          pipeline = newPipeline(sharedKeyCredential);
     } else {
          setTimeout(waitForSecret, 300);
     }
}

waitForSecret();

const blobServiceClient = new BlobServiceClient(
     `https://404blob.blob.core.windows.net`,
     pipeline
);

router.get('/', isLoggedIn, async (req, res, next) => {
     const locals = {
          title: `${req.user.dataValues.username}'s Profile`,
          description: null,
          style: '/css/profile.css',
     };
     console.log(req.user.dataValues.username);
     db.user
          .findOne({
               where: {
                    id: req.user.dataValues.id,
               },
          })
          .then(user => {
               res.render('./profile', { meta: locals, data: user });
          });
});

router.get('/profile/:user', (req, res) => {
     const locals = {
          title: req.params.user,
          description: null,
     };
     db.user
          .findOne({
               where: {
                    username: req.params.user,
               },
          })
          .then(user => {
               locals.description = user.dataValues.bio;
               res.render('profile', { meta: locals, data: user });
          });
});

router.put('/profile', isLoggedIn, (req, res) => {});

module.exports = router;
