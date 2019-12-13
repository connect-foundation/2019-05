const passport = require('passport');
const NaverStrategy = require('passport-naver').Strategy;
const { env } = process;
const { prisma } = require('../generated/prisma-client');

const clientInfo = {
  clientID: env.NAVER_CLIENT_ID,
  clientSecret: env.NAVER_CLIENT_SECRET,
  callbackURL: env.NAVER_LOGIN_CALLBACK_URL,
};

passport.serializeUser((user, done) => done(null, user));

passport.deserializeUser((user, done) => done(null, user));

passport.use(
  new NaverStrategy(
    clientInfo,
    async (accessToken, refreshToken, profile, done) => {
      const playerId = profile.id;
      const players = await prisma.players({where: {playerId}});
      if(!players.length) await prisma.createPlayer({playerId});
      return done(null, profile);
    }
  )
);

module.exports = passport;
