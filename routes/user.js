const express = require('express');
const router  = express.Router();

const profileController = require('../controllers/profile_controller');

router.get('/profile',profileController.profile);
router.get('/name',profileController.name);


module.exports = router;