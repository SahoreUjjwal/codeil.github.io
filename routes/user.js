const express = require('express');
const passport = require('../config/passport-local-strategy');
const router  = express.Router();

const profileController = require('../controllers/profile_controller');

router.get('/profile',profileController.profile);
router.get('/name',profileController.name);
router.get('/sign-in',profileController.signin);
router.get('/sign-up',profileController.signup);
router.post('/create',profileController.create);
router.post('/create-session',passport.authenticate('local',{failureRedirect:'/user/name'}),profileController.createSession);

module.exports = router;