const express = require('express');

const router = express.Router();
const homeController = require('../controllers/home_controller');
console.log('router loaded');

// Base route
router.get('/', homeController.home);

// for any further routes, access from here
// router.use('/routerName', require('./routerfile));
router.use('/users', require('./users'));
router.use('/posts',require('./posts'));
router.use('/comment',require('./comment'));
router.use('/api',require('./api/index'));
router.use('/likes',require('./likes'));


module.exports = router;