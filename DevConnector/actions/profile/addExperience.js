const handleValidationError = require('../../validation/handleValidationError');
const handleServerError = require('../users&auth/handleServerError');
const Profile = require('../../models/Profile');

const addExperience = async (req, res) => {
  if (!handleValidationError(req, res)) {
    const { title, company, location, from, to, current, description } = req.body;

    const newExp = {
      title,
      company,
      location,
      from,
      to,
      current,
      description,
    };

    try {
      const profile = await Profile.findOne({ user: req.user.id });

      profile.experience.unshift(newExp);

      await profile.save();

      res.json(profile);
    } catch (err) {
      handleServerError(err, res);
    }
  }
};

module.exports = addExperience;
