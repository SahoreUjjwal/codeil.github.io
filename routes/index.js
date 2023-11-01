const express = require('express');

const homeController = require('../controllers/home_controller');

const router = express.Router();

router.get('/home',homeController.home);
router.get('/login',homeController.login);

module.exports = router;
