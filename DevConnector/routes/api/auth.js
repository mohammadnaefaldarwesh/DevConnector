const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const authenticateUser = require('../../actions/users&auth/authenticateUser');
const testingAuthRoute = require('../../actions/users&auth/testingAuthRoute');
const { checkLoginInfo } = require('../../validation/validation');

// @route api/auth // @access Public
router.get('/', auth, testingAuthRoute);

// @route api/auth // @access Public
router.post('/', checkLoginInfo, authenticateUser);

module.exports = router;
