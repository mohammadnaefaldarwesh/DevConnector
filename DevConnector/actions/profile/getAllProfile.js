const handleServerError = require('../users&auth/handleServerError');
const Profile = require('../../models/Profile');

const getAllProfile = async (req, res) => {
  try {
    const profiles = await Profile.find().populate('user', ['name', 'avatar']);
    res.json(profiles);
  } catch (err) {
    handleServerError(err, res);
  }
};

module.exports = getAllProfile;
