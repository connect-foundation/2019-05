const { prisma } = require('../generated/prisma-client');
const convertToString = require('../utils/convertToString');

const findOrCreateUser = async (accessToken, refreshToken, profile, done) => {
  const authProvider = profile.provider.toUpperCase();
  console.log(profile);
  const playerId = convertToString(profile.id);
  const players = await prisma.players({where: {authProvider, playerId}});
  if(!players.length) await prisma.createPlayer({authProvider, playerId});
  return done(null, profile);
};

module.exports = findOrCreateUser;