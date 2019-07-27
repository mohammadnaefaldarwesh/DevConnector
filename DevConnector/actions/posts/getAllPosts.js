const Post = require('../../models/Post');
const handleServerError = require('../users&auth/handleServerError');

const getAllPosts = async (req, res) => {
  try {
    const posts = await Post.find().sort({ date: -1 });
    res.json(posts);
  } catch (err) {
    handleServerError(err, res);
  }
};

module.exports = getAllPosts;
