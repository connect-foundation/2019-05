const { prisma } = require('../generated/prisma-client');
const convertToString = require('../utils/convertToString');

const findOrCreateUser = async (accessToken, refreshToken, profile, done) => {
  const authProvider = profile.provider.toUpperCase();
  const playerId = convertToString(profile.id);
  const [ player ] = await prisma.players({where: {authProvider, playerId}});
  if(!player) await prisma.createPlayer({authProvider, playerId});
  return done(null, profile);
};

module.exports = findOrCreateUser;