const { check } = require('express-validator/check');

const checkUserInfo = [
  check('name', 'Name is required')
    .not()
    .isEmpty(),
  check('email', 'Please include a valid email').isEmail(),
  check('password', 'Please enter a password with 6 or more characters').isLength({ min: 6 }),
];

const checkLoginInfo = [
  check('email', 'Please include a valid email').isEmail(),
  check('password', 'Password is required').exists(),
];

const checkProfileInfo = [
  check('status', 'Status is required')
    .not()
    .isEmpty(),
  check('skills', 'Skills is required')
    .not()
    .isEmpty(),
];

const checkExpInfo = [
  check('title', 'Title is required')
    .not()
    .isEmpty(),
  check('company', 'Company is required')
    .not()
    .isEmpty(),
  check('from', 'From date is required')
    .not()
    .isEmpty(),
];

const checkEduInfo = [
  check('school', 'School is required')
    .not()
    .isEmpty(),
  check('degree', 'Degree is required')
    .not()
    .isEmpty(),
  check('fieldofstudy', 'Field of study is required')
    .not()
    .isEmpty(),
  check('from', 'From date is required')
    .not()
    .isEmpty(),
];

const checkPostAndComment = [
  check('text', 'Text is required')
    .not()
    .isEmpty(),
];

module.exports = {
  checkUserInfo,
  checkLoginInfo,
  checkProfileInfo,
  checkExpInfo,
  checkEduInfo,
  checkPostAndComment,
};
