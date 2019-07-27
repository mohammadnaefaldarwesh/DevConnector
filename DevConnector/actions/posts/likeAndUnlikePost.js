const handleServerError = require('../users&auth/handleServerError');
const Post = require('../../models/Post');

const likeAndUnlikePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    // Check if the post has already been liked
    if (post.likes.filter(like => like.user.toString() === req.user.id).length > 0) {
      const removeIndex = post.likes.map(like => like.user.toString()).indexOf(req.user.id);

      post.likes.splice(removeIndex, 1);

      await post.save();

      return res.json(post.likes);
    }

    post.likes.unshift({ user: req.user.id });

    await post.save();

    res.json(post.likes);
  } catch (err) {
    handleServerError(err, res);
  }
};

module.exports = likeAndUnlikePost;
