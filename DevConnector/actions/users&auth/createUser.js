const gravatar = require('gravatar');
const User = require('../../models/User');
const bcrypt = require('bcryptjs');
const handleServerError = require('./handleServerError');
const createPayloadAndSignIt = require('./createPayloadAndSignIt');
const handleValidationError = require('../../validation/handleValidationError');

const createUser = async (req, res) => {
  if (!handleValidationError(req, res)) {
    const { name, email, password } = req.body;

    try {
      let user = await User.findOne({ email });

      if (user) {
        return res.status(400).json({ errors: [{ msg: 'User already exists' }] });
      }

      const avatar = gravatar.url(email, { s: '200', r: 'pg', d: 'mm' });

      user = new User({
        name,
        email,
        avatar,
        password,
      });

      const salt = await bcrypt.genSalt(10);

      user.password = await bcrypt.hash(password, salt);

      createPayloadAndSignIt(user, res);

      await user.save();
    } catch (err) {
      handleServerError(err, res);
    }
  }
};

module.exports = createUser;
