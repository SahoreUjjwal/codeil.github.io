const express = require('express');
const router = express.Router();
const apiPostController = require('../../../controllers/api/v1/posts_api');
router.get('/',apiPostController.index);
router.delete('/:id',apiPostController.destroy);
module.exports = router;