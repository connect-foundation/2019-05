const express = require('express');
const auth = express.Router();
const {
  startLoginInNaver,
  startLoginInKakao,
  failMessageInNaver,
  failMessageInKakao,
  successOrFailLoginInNaver,
  successOrFailLoginInKakao,
  publishToken,
  redirectToHome,
  redirectAfterLogout,
} = require('./controller');

auth.get('/naver', startLoginInNaver, failMessageInNaver);

auth.get('/naver/callback', successOrFailLoginInNaver, publishToken, redirectToHome);

auth.get('/kakao', startLoginInKakao, failMessageInKakao);

auth.get('/kakao/callback', successOrFailLoginInKakao, publishToken, redirectToHome);

auth.get('/logout', redirectAfterLogout);

module.exports = auth;
