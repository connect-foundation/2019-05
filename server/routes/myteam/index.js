const express = require('express');
const myteam = express.Router();
const {
  getPlayersTeam,
  fileUploader,
  uploadEmblemImage,
} = require('./controller');

myteam.get('/', getPlayersTeam);
myteam.post('/emblem', fileUploader.single('emblem'), uploadEmblemImage);

module.exports = myteam;
