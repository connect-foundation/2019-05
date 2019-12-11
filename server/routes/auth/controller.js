const jwt = require('jsonwebtoken');
const passport = require('../../middlewares/passport');
const { env } = process;

const startNaverLogin = (req, res, next) => {
  passport.authenticate('naver', null)(req, res, next);
};

const failMessage = (req, res) => {
  console.log('/auth/naver failed, stopped');
  res.status(400).json({ status: 400, msg: 'naver-login failed, stopped' });
};

const successOrFailLogin = (req, res, next) => {
  passport.authenticate('naver', { failureRedirect: '#!/auth/login' })(
    req,
    res,
    next
  );
};

function publishToken(req, res, next) {
  const playerId = req.user.id;
  const payload = { playerId };
  const expiresIn = { expiresIn: '5m' };
  const token = jwt.sign(payload, env.JWT_SECRET, expiresIn);
  res.cookie('jwt', token);
  next();
}

const redirectToHome = (req, res) => {
  return res.redirect(env.REDIRECT_URL);
};

const redirectAfterLogout = (req, res) => {
  res.clearCookie('jwt');
  return res.redirect(env.REDIRECT_URL);
};

module.exports = {
  startNaverLogin,
  failMessage,
  successOrFailLogin,
  publishToken,
  redirectToHome,
  redirectAfterLogout,
};
