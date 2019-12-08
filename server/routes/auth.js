const jwt = require('jsonwebtoken');
const express = require('express');
const auth = express.Router();
const passport = require('../middlewares/passport');
const { env } = process;

const naverLogin = (req, res, next) => {
  passport.authenticate('naver', null)(req,res,next);
};

const failMessage = (req, res) => console.log('/auth/naver failed, stopped');

const naverLoginResult = (req, res, next) => {
  passport.authenticate('naver', {failureRedirect: '#!/auth/login'})(req,res,next);
};

const successLogin = (req, res) => {
  // res.cookie('isLogin', 'true');
  const returnURL =
    process.env.NODE_ENV === 'development'
      ? 'http://127.0.0.1:3000'
      : 'http://quickkick.site:3000';
  return res.redirect(returnURL);
};

function publishToken(req, res, next) {
  const { id } = req.user;
  const payload = { id };
  const expiresIn = { expiresIn: '5m' };
  const token = jwt.sign(payload, env.JWT_SECRET, expiresIn);
  res.cookie('jwt', token);
  next();
}

auth.get('/naver', naverLogin, failMessage);
auth.get('/naver/callback', naverLoginResult, publishToken, successLogin);

auth.get('/logout', (req, res) => {
  res.clearCookie('jwt');
  const returnURL =
    process.env.NODE_ENV === 'development'
      ? 'http://127.0.0.1:3000'
      : 'http://quickkick.site:3000';
  return res.redirect(returnURL);
});

module.exports = auth;
