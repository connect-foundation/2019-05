const passport = require('passport');
const NaverStrategy = require('passport-naver').Strategy;
const { env } = process;

const prodClientInfo = {
  clientID: env.NAVER_CLIENT_ID,
  clientSecret: env.NAVER_CLIENT_SECRET,
  callbackURL: env.NAVER_LOGIN_CALLBACK_URL_DEV,
};

const devClientInfo = {
  clientID: env.NAVER_CLIENT_ID_DEV,
  clientSecret: env.NAVER_CLIENT_SECRET_DEV,
  callbackURL: env.NAVER_LOGIN_CALLBACK_URL_DEV,
};

const clientInfo = env.NODE_ENV === 'development' ? devClientInfo : prodClientInfo;

passport.serializeUser((user, done) => done(null, user));

passport.deserializeUser((user, done) => done(null, user));

passport.use(
  new NaverStrategy(
    clientInfo,
    (accessToken, refreshToken, profile, done) => {
      /*
      QuickKick 회원 DB에 저장되어 있는지 검사하는 부분 필요
      아래는 임시로 1개의 아이디와의 비교만 하고 있음
       */
      return done(null, profile);
      // if (profile.id === '113927503') return done(null, profile);
      // else {
      //   console.log('없는 회원입니다');
      //   return done(null, null);
      // }
    }
  )
);

module.exports = passport;
