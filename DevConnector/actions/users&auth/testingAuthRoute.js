const handleServerError = require('./handleServerError');

const testingAuthRoute = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    res.json(user);
  } catch (err) {
    handleServerError(err, res);
  }
};

module.exports = testingAuthRoute;
