const { prisma } = require('../generated/prisma-client');
const convertToString = require('../utils/convertToString');

const findOrCreateUser = async (accessToken, refreshToken, profile, done) => {
  const playerId = convertToString(profile.id);
  const players = await prisma.players({where: {playerId}});
  if(!players.length) await prisma.createPlayer({playerId});
  return done(null, profile);
};

module.exports = findOrCreateUser;