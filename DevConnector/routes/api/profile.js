const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const getCurrentUserProfile = require('../../actions/profile/getCurrentUserProfile');
const { checkProfileInfo, checkExpInfo, checkEduInfo } = require('../../validation/validation');
const createAndUpdateProfile = require('../../actions/profile/createAndUpdateProfile');
const getAllProfile = require('../../actions/profile/getAllProfile');
const getOneProfile = require('../../actions/profile/getOneProfile');
const deleteUser = require('../../actions/profile/deleteUser');
const addExperience = require('../../actions/profile/addExperience');
const deleteExperience = require('../../actions/profile/deleteExperience');
const addEducation = require('../../actions/profile/addEducation');
const deleteEducation = require('../../actions/profile/deleteEducation');
const getGithubRepos = require('../../actions/profile/getGithubRepos');

// @route  api/profile/me // @access Private
router.get('/me', auth, getCurrentUserProfile);

// @route    api/profile // @access Private
router.post('/', [auth, checkProfileInfo], createAndUpdateProfile);

// @route    api/profile // @access   Public
router.get('/', getAllProfile);

// @route    api/profile/user/:user_id // @access   Public
router.get('/user/:user_id', getOneProfile);

// @route   api/profile // @access   Private
router.delete('/', auth, deleteUser);

// @route   api/profile/experience // @access   Private
router.put('/experience', [auth, checkExpInfo], addExperience);

// @route   api/profile/experience/:exp_id // @access   Private
router.delete('/experience/:exp_id', auth, deleteExperience);

// @route   api/profile/education // @access Private
router.put('/education', [auth, checkEduInfo], addEducation);

// @route  api/profile/education/:edu_id // @access   Private
router.delete('/education/:edu_id', auth, deleteEducation);

// @route   api/profile/github/:username // @access   Public
router.get('/github/:username', getGithubRepos);

module.exports = router;
