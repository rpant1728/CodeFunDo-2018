var express = require('express');
var router = express.Router();
var jwt = require('express-jwt');
var authController = require('../controllers/authentication');
var profileController = require('../controllers/profile');

var auth = jwt({
  secret: 'sha512',
  userProperty: 'payload'
})

router.post('/register', authController.register);
router.post('/login', authController.login);
router.get('/profile', auth, profileController.profileRead);

module.exports = router;
