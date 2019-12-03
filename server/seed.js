require('dotenv').config();
const { Player, Match, Team } = require('./dummy-data');
const { prisma } = require('./generated/prisma-client');

const seed = async () => {
  for (let te of Team) {
    await prisma.createTeam(te);
  }

  for (let pl of Player) {
    await prisma.createPlayer(pl);
  }

  for (let ma of Match) {
    await prisma.createMatch(ma);
  }
};

seed().catch((e) => console.log(e));
