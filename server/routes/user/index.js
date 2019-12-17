const express = require('express');
const user = express.Router();
const { getUserInfo, getTeamInfo } = require('./controller');

user.get('/', getUserInfo);

user.get('/team', getTeamInfo);

module.exports = user;
