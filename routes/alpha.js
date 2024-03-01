const express = require('express');
const wrapAsync = require('../utils/wrapAsync');
const { userInputValidator } = require('../middleware');
const router = express.Router();
const alphaController = require('../controllers/alpha')


// Get Alpha Route
router.get('/', userInputValidator, wrapAsync(alphaController.alpha));


module.exports = router;