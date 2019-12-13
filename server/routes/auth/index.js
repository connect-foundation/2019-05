const express = require('express');
const auth = express.Router();
const {
  startNaverLogin,
  failMessage,
  successOrFailLogin,
  publishToken,
  redirectToHome,
  redirectAfterLogout,
} = require('./controller');

auth.get('/naver', startNaverLogin, failMessage);

auth.get('/naver/callback', successOrFailLogin, publishToken, redirectToHome);

auth.get('/logout', redirectAfterLogout);

module.exports = auth;
