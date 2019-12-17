const { prisma } = require('../generated/prisma-client');

const getUserAndTeam = async (userSeq) => {
  return {
    ...(await prisma.player({ seq: userSeq })),
    team: await prisma.player({ seq: userSeq }).team(),
  };
};

module.exports = getUserAndTeam;