const passport = require('passport');
const NaverStrategy = require('passport-naver').Strategy;
const {env} = process;

passport.serializeUser((user, done) => done(null, user));

passport.deserializeUser((user, done) => done(null, user));

passport.use(new NaverStrategy({
    clientID: env.NAVER_CLIENT_ID,
    clientSecret: env.NAVER_CLIENT_SECRET,
    callbackURL: env.NAVER_LOGIN_CALLBACK_URL
  },
  (accessToken, refreshToken, profile, done) => {
    return done(null, profile);
  }
));

module.exports = passport;