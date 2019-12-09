require('dotenv').config({
  path: '../.env.development',
});
const uuidv4 = require('uuid/v4');

const { Player, Match, Team } = require('./dummy-data');
const { prisma } = require('./generated/prisma-client');

const seed = async () => {
  for (let te of Team) {
    const uid = uuidv4().substr(0, 8);
    const uuidForTeam = {
      ...te,
      teamUniqueId: uid,
    };
    await prisma.createTeam(uuidForTeam);
  }

  for (let pl of Player) {
    await prisma.createPlayer(pl);
  }

  for (let ma of Match) {
    await prisma.createMatch(ma);
  }
};

seed().catch((e) => console.log(e));
