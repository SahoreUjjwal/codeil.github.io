const express = require('express');
const passport = require('passport');
const router = express.Router();
const apiPostController = require('../../../controllers/api/v1/posts_api');
router.get('/',apiPostController.index);
router.delete('/:id',passport.authenticate('jwt',{session:false}),apiPostController.destroy);
module.exports = router;