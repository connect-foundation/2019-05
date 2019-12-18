const findNotifier = require('./middlewares/matchNotification');
const resolvers = {
  Query: {
    Matches: (_, { seq, area, host }, { prisma }) => {
      return prisma.matches({
        where: {
          seq,
          area,
          host: host
            ? {
                seq: host,
              }
            : undefined,
        },
      });
    },
    PendingMatches: (
      _,
      { first, area, startTime, endTime, date },
      { prisma }
    ) => {
      return prisma.matches({
        where: {
          guest: null,
          area_in: area,
          startTime_gte: startTime,
          endTime_lte: endTime,
          date,
        },
        first,
        orderBy: 'startTime_ASC',
      });
    },
    Match: (_, { seq }, { prisma }) => {
      return prisma.match({ seq });
    },
    Teams: (_, { seq }, { prisma }) => {
      return prisma.teams({
        where: {
          seq,
        },
      });
    },
    Team: (_, { seq }, { prisma }) => {
      return prisma.team({ seq });
    },
    Players: (_, { seq, playerId, team }, { prisma }) => {
      return prisma.players({
        where: {
          seq,
          playerId,
          team: team
            ? {
                seq: team,
              }
            : undefined,
        },
      });
    },
    Player: (_, { seq, playerId }, { prisma }) => {
      return prisma.player({
        seq,
        playerId,
      });
    },
    Notifiers: (_, { seq, player }, { prisma }) => {
      return prisma.notifiers({
        seq,
        player: player
          ? {
              seq: player,
            }
          : undefined,
      });
    },
    Notifier: (_, { seq }, { prisma }) => {
      return prisma.notifier({ seq });
    },
  }, // query
  Mutation: {
    CreateTeam: (_, { name, logo, homeArea, introduction }, { prisma }) => {
      return prisma.createTeam({
        name,
        logo,
        homeArea,
        introduction,
      });
    },
    CreatePlayer: (_, { playerId, team, name, phone, email }, { prisma }) => {
      return prisma.createPlayer({
        playerId,
        team: team
          ? {
              connect: {
                seq: team,
              },
            }
          : null,
        name,
        phone,
        email,
      });
    },
    CreateMatch: async (
      _,
      {
        host,
        author,
        stadium,
        address,
        area,
        date,
        startTime,
        endTime,
        description,
      },
      { prisma }
    ) => {
      const notiList = await findNotifier(date, startTime, endTime, area);
      return prisma.createMatch({
        host: {
          connect: {
            seq: host,
          },
        },
        author: {
          connect: {
            playerId: author,
          },
        },
        status: 'OPEN',
        stadium,
        address,
        area,
        date,
        startTime,
        endTime,
        description,
      });
    },
    MatchGuest: (_, { seq, guest }, { prisma }) => {
      return prisma.updateMatch({
        data: {
          guest: {
            connect: {
              seq: guest,
            },
          },
        },
        where: {
          seq,
        },
      });
    },
    CreateNotifier: (
      _,
      { player, area, date, startTime, endTime },
      { prisma }
    ) => {
      return prisma.createNotifier({
        player: {
          connect: {
            seq: player,
          },
        },
        area: {
          set: area,
        },
        date,
        startTime,
        endTime,
      });
    },
    UpdateTeamInfo: (
      _,
      { seq, name, logo, homeArea, introduction },
      { prisma }
    ) => {
      return prisma.updateTeam({
        data: {
          name,
          logo,
          homeArea,
          introduction,
        },
        where: {
          seq,
        },
      });
    },
    ApplyMatch: (_, { team, player, match }, { prisma }) => {
      return prisma.createApply({
        team: {
          connect: {
            seq: team,
          },
        },
        match: {
          connect: {
            seq: match,
          },
        },
        player: {
          connect: {
            playerId: player,
          },
        },
      });
    },
  }, // mutation
  Match: {
    author: ({ seq }, _, { prisma }) => {
      return prisma.match({ seq }).author();
    },
    host: ({ seq }, _, { prisma }) => {
      return prisma.match({ seq }).host();
    },
    guest: ({ seq }, _, { prisma }) => {
      return prisma.match({ seq }).guest();
    },
    appliedLists: ({ seq }, _, { prisma }) => {
      return prisma.match({ seq }).appliedLists();
    },
  },
  Team: {
    members: ({ seq }, _, { prisma }) => {
      return prisma.team({ seq }).members();
    },
    uploadMatchList: ({ seq }, _, { prisma }) => {
      return prisma.team({ seq }).uploadMatchList({
        orderBy: 'date_DESC',
      });
    },
    matchingDoneList: ({ seq }, _, { prisma }) => {
      return prisma.team({ seq }).matchingDoneList();
    },
    onApplyingList: ({ seq }, _, { prisma }) => {
      return prisma.team({ seq }).onApplyingList();
    },
    owner: ({ seq }, _, { prisma }) => {
      return prisma.team({ seq }).owner();
    },
  },

  Player: {
    team: ({ seq }, _, { prisma }) => {
      return prisma.player({ seq }).team();
    },
    notiList: ({ seq }, _, { prisma }) => {
      return prisma.player({ seq }).notiList();
    },
  },
  Notifier: {
    player: ({ seq }, _, { prisma }) => {
      return prisma.player({ seq });
    },
  },
  Apply: {
    team: ({ seq }, _, { prisma }) => {
      return prisma.apply({ seq }).team();
    },
    player: ({ seq }, _, { prisma }) => {
      return prisma.apply({ seq }).player();
    },
    match: ({ seq }, _, { prisma }) => {
      return prisma.apply({ seq }).match();
    },
  },
};

module.exports = resolvers;
