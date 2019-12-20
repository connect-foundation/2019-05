const jwt = require('jsonwebtoken');
const passport = require('../../middlewares/passport');
const { env } = process;
const convertToString = require('../../utils/convertToString');

const startLoginInNaver = (req, res, next) => {
  passport.authenticate('naver', null)(req, res, next);
};

const startLoginInKakao = (req, res, next) => {
  passport.authenticate('kakao', null)(req, res, next);
};

const failMessageInNaver = (req, res) => {
  console.log('/auth/naver failed, stopped');
  res.status(400).json({ status: 400, msg: 'naver-login failed, stopped' });
};

const failMessageInKakao = (req, res) => {
  console.log('/auth/kakao failed, stopped');
  res.status(400).json({ status: 400, msg: 'kakao-login failed, stopped' });
};

const successOrFailLoginInNaver = (req, res, next) => {
  passport.authenticate('naver', { failureRedirect: '#!/auth/login' })(
    req,
    res,
    next
  );
};

const successOrFailLoginInKakao = (req, res, next) => {
  passport.authenticate('kakao', { failureRedirect: '#!/auth/login' })(
    req,
    res,
    next
  );
};

const publishToken = (req, res, next) => {
  const authProvider = req.user.provider.toUpperCase();
  const playerId = convertToString(req.user.id);
  const payload = { authProvider, playerId };
  const token = jwt.sign(payload, env.JWT_SECRET);
  res.cookie('jwt', token);
  next();
};

const redirectToHome = (req, res) => {
  return res.redirect(env.REDIRECT_URL);
};

const redirectAfterLogout = (req, res) => {
  res.clearCookie('jwt');
  return res.redirect(env.REDIRECT_URL);
};

module.exports = {
  startLoginInNaver,
  startLoginInKakao,
  failMessageInNaver,
  failMessageInKakao,
  successOrFailLoginInNaver,
  successOrFailLoginInKakao,
  publishToken,
  redirectToHome,
  redirectAfterLogout,
};
