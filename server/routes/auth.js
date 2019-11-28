const express = require('express');
const auth = express.Router();
const passport = require('../middlewares/passport');

const naverLogin = () => passport.authenticate('naver', null);

const failMessage = (req, res) => console.log('/auth/naver failed, stopped');

const naverLoginResult = () =>
  passport.authenticate('naver', {
    failureRedirect: '#!/auth/login',
  });

const successLogin = (req, res) => {
  console.log(req.user);
  res.cookie('isLogin', 'true');
  const returnURL =
    process.env.NODE_ENV === 'development'
      ? 'http://127.0.0.1:3000'
      : 'http://quickkick.site:3000';
  return res.redirect(returnURL);
};

auth.get('/naver', naverLogin(), failMessage);
auth.get('/naver/callback', naverLoginResult(), successLogin);

auth.get('/logout', (req, res) => {
  res.cookie('isLogin', 'false');
  const returnURL =
    process.env.NODE_ENV === 'development'
      ? 'http://127.0.0.1:3000'
      : 'http://quickkick.site:3000';
  return res.redirect(returnURL);
});
module.exports = auth;
