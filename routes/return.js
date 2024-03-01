const express = require('express');
const wrapAsync = require('../utils/wrapAsync');
const { userInputValidator } = require('../middleware');
const router = express.Router();
const returnController = require('../controllers/return')

// Get Return Route
router.get('/', userInputValidator, wrapAsync(returnController.getReturn));


module.exports = router;