const express = require('express');
const router = express.Router();
const createUser = require('../../actions/users&auth/createUser');
const { checkUserInfo } = require('../../validation/validation');

// @route api/users // @access Public
router.post('/', checkUserInfo, createUser);

module.exports = router;
