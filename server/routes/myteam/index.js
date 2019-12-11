const express = require('express');
const myteam = express.Router();
const { getPlayersTeam } = require('./controller');

myteam.get('/', getPlayersTeam);

module.exports = myteam;
