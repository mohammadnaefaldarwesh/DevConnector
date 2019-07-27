const handleServerError = require('../users&auth/handleServerError');
const handleValidationError = require('../../validation/handleValidationError');
const Post = require('../../models/Post');
const User = require('../../models/User');

const createPost = async (req, res) => {
  if (!handleValidationError(req, res)) {
    try {
      const user = await User.findById(req.user.id).select('-password');

      const newPost = new Post({
        text: req.body.text,
        name: user.name,
        avatar: user.avatar,
        user: req.user.id,
      });

      const post = await newPost.save();

      res.json(post);
    } catch (err) {
      handleServerError(err.res);
    }
  }
};

module.exports = createPost;
