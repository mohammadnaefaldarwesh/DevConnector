const handleValidationError = require('../../validation/handleValidationError');
const handleServerError = require('../users&auth/handleServerError');
const Profile = require('../../models/Profile');

const createAndUpdateProfile = async (req, res) => {
  if (!handleValidationError(req, res)) {
    const {
      company,
      website,
      location,
      bio,
      status,
      githubusername,
      skills,
      youtube,
      facebook,
      twitter,
      instagram,
      linkedin,
    } = req.body;

    // Build profile object
    const profileFields = {};
    profileFields.user = req.user.id;
    if (company) profileFields.company = company;
    if (website) profileFields.website = website;
    if (location) profileFields.location = location;
    if (bio) profileFields.bio = bio;
    if (status) profileFields.status = status;
    if (githubusername) profileFields.githubusername = githubusername;
    if (skills) {
      profileFields.skills = skills.split(',').map(skill => skill.trim());
    }

    // Build social object
    profileFields.social = {};
    const { social } = profileFields;
    if (youtube) social.youtube = youtube;
    if (twitter) social.twitter = twitter;
    if (facebook) social.facebook = facebook;
    if (linkedin) social.linkedin = linkedin;
    if (instagram) social.instagram = instagram;

    try {
      let profile = await Profile.findOne({ user: req.user.id });

      if (profile) {
        // Update
        profile = await Profile.findOneAndUpdate(
          { user: req.user.id },
          { $set: profileFields },
          { new: true },
        );

        return res.json(profile);
      }

      // Create
      profile = new Profile(profileFields);

      await profile.save();
      res.json(profile);
    } catch (err) {
      handleServerError(err, res);
    }
  }
};

module.exports = createAndUpdateProfile;
