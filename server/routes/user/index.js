const express = require('express');
const user = express.Router();
const { getUserInfo, isSignUp } = require('./controller');

user.get('/', getUserInfo);

user.get('/member', isSignUp);

module.exports = user;
