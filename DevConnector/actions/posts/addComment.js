const handleServerError = require('../users&auth/handleServerError');
const Post = require('../../models/Post');
const User = require('../../models/User');
const handleValidationError = require('../../validation/handleValidationError');

const addComment = async (req, res) => {
  if (!handleValidationError(req, res)) {
    try {
      const user = await User.findById(req.user.id).select('-password');
      const post = await Post.findById(req.params.id);

      const newComment = {
        text: req.body.text,
        name: user.name,
        avatar: user.avatar,
        user: req.user.id,
      };

      post.comments.unshift(newComment);

      await post.save();

      res.json(post.comments);
    } catch (err) {
      handleServerError(err, res);
    }
  }
};

module.exports = addComment;
