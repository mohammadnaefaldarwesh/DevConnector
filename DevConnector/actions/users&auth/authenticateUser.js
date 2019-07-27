const bcrypt = require('bcryptjs');
const User = require('../../models/User');
const handleValidationError = require('../../validation/handleValidationError');
const createPayloadAndSignIt = require('./createPayloadAndSignIt');
const handleServerError = require('./handleServerError');

const authenticateUser = async (req, res) => {
  if (!handleValidationError(req, res)) {
    const { email, password } = req.body;

    try {
      let user = await User.findOne({ email });

      if (!user) {
        return res.status(400).json({ errors: [{ msg: 'Invalid Credentials' }] });
      }

      const isMatch = await bcrypt.compare(password, user.password);

      if (!isMatch) {
        return res.status(400).json({ errors: [{ msg: 'Invalid Credentials' }] });
      }
      createPayloadAndSignIt(user, res);
    } catch (err) {
      handleServerError(err, res);
    }
  }
};

module.exports = authenticateUser;
