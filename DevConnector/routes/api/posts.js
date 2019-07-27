const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const createPost = require('../../actions/posts/createPost');
const getAllPosts = require('../../actions/posts/getAllPosts');
const getPostById = require('../../actions/posts/getPostById');
const deletePost = require('../../actions/posts/deletePost');
const likeAndUnlikePost = require('../../actions/posts/likeAndUnlikePost');
const addComment = require('../../actions/posts/addComment');
const deleteComment = require('../../actions/posts/deleteComment');
const { checkPostAndComment } = require('../../validation/validation');

// @route  api/posts // @access   Private
router.post('/', [auth, checkPostAndComment], createPost);

// @route  api/posts // @access   Private
router.get('/', auth, getAllPosts);

// @route  api/posts/:id // @access Private
router.get('/:id', auth, getPostById);

// @route   api/posts/:id // @access   Private
router.delete('/:id', auth, deletePost);

// @route  api/posts/like/:id // @access   Private
router.put('/like/:id', auth, likeAndUnlikePost);

// @route   api/posts/comment/:id // @access   Private
router.post('/comment/:id', [auth, checkPostAndComment], addComment);

// @route   api/posts/comment/:id/:comment_id // @access   Private
router.delete('/comment/:id/:comment_id', auth, deleteComment);

module.exports = router;
