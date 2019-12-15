const passport = require('passport');
const NaverStrategy = require('passport-naver').Strategy;
const KakaoStrategy = require('passport-kakao').Strategy;
const { env } = process;
const findOrCreateUser = require('./findOrCreateUser');

const naverClientInfo = {
  clientID: env.NAVER_CLIENT_ID,
  clientSecret: env.NAVER_CLIENT_SECRET,
  callbackURL: env.NAVER_LOGIN_CALLBACK_URL,
};

const kakaoClientInfo = {
  clientID: env.KAKAO_CLIENT_ID,
  callbackURL: env.KAKAO_LOGIN_CALLBACK_URL,
};

passport.serializeUser((user, done) => done(null, user));

passport.deserializeUser((user, done) => done(null, user));

passport.use(
  new NaverStrategy(naverClientInfo, findOrCreateUser)
);

passport.use(
  new KakaoStrategy(kakaoClientInfo, findOrCreateUser)
);

module.exports = passport;
