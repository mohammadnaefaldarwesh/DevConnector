const handleValidationError = require('../../validation/handleValidationError');
const handleServerError = require('../users&auth/handleServerError');
const Profile = require('../../models/Profile');

const addEducation = async (req, res) => {
  if (!handleValidationError(req, res)) {
    const { school, degree, fieldofstudy, from, to, current, description } = req.body;

    const newEdu = {
      school,
      degree,
      fieldofstudy,
      from,
      to,
      current,
      description,
    };

    try {
      const profile = await Profile.findOne({ user: req.user.id });

      profile.education.unshift(newEdu);

      await profile.save();

      res.json(profile);
    } catch (err) {
      handleServerError(err, res);
    }
  }
};

module.exports = addEducation;
