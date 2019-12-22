require('dotenv').config({
  path: '../.env.development',
});
const uuidv4 = require('uuid/v4');

const { Player, Match, Team } = require('./dummy-data');
const { prisma } = require('./generated/prisma-client');

const seed = async () => {
  for (let pl of Player) {
    await prisma.createPlayer(pl);
  }

  let teamIdx = 1;
  for (let te of Team) {
    const uid = uuidv4().substr(0, 8);
    const uuidForTeam = {
      ...te,
      teamUniqueId: uid,
      owner: {
        connect: {
          seq: teamIdx,
        },
      },
    };
    await prisma.createTeam(uuidForTeam);
    teamIdx = teamIdx + 4;
  }

  let plIdx = 1;
  for (let pl of Player) {
    await prisma.updatePlayer({
      data: {
        team: {
          connect: {
            seq: Math.ceil(plIdx / 4),
          },
        },
      },
      where: {
        seq: plIdx,
      },
    });
    plIdx = plIdx + 1;
  }

  for (let ma of Match) {
    await prisma.createMatch(ma);
  }
};

seed().catch((e) => console.log(e));
