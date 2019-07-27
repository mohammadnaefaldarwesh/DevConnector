const handleServerError = require('../users&auth/handleServerError');
const Profile = require('../../models/Profile');

const getCurrentUserProfile = async (req, res) => {
  try {
    const profile = await Profile.findOne({ user: req.user.id }).populate('user', [
      'name',
      'avatar',
    ]);

    if (!profile) {
      return res.status(400).json({ msg: 'There is no profile for this user' });
    }

    res.json(profile);
  } catch (err) {
    handleServerError(err, res);
  }
};

module.exports = getCurrentUserProfile;
