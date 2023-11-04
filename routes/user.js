const express = require('express');
const router  = express.Router();

const profileController = require('../controllers/profile_controller');

router.get('/profile',profileController.profile);
router.get('/name',profileController.name);
router.get('/sign-in',profileController.signin);
router.get('/sign-up',profileController.signup);
router.post('/create',profileController.create);


module.exports = router;