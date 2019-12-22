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
      { first, skip, area, startTime, endTime, date },
      { prisma }
    ) => {
      return prisma.matches({
        where: {
          guest: null,
          status: 'OPEN',
          area_in: area,
          startTime_gte: startTime,
          endTime_lte: endTime,
          date,
        },
        first,
        skip,
        orderBy: 'startTime_ASC',
      });
    },
    MatchConnection: (
      _,
      { first, skip, area, startTime, endTime, date },
      { prisma }
    ) => {
      return prisma.matchesConnection({
        where: {
          guest: null,
          status: 'OPEN',
          area_in: area,
          startTime_gte: startTime,
          endTime_lte: endTime,
          date,
        },
        first,
        skip,
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
    Team: (_, { seq, teamUniqueId, date }, { prisma }) => {
      return prisma.team({ seq, teamUniqueId });
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
        where: {
          seq,
          player: player
            ? {
                seq: player,
              }
            : undefined,
        },
      });
    },
    Notifier: (_, { seq }, { prisma }) => {
      return prisma.notifier({ seq });
    },
  }, // query
  Mutation: {
    CreateTeam: (_, { name, teamUniqueId, owner }, { prisma }) => {
      return prisma.createTeam({
        name,
        teamUniqueId,
        owner: owner
          ? {
              connect: {
                seq: owner,
              },
            }
          : null,
        win: 0,
        draw: 0,
        lose: 0,
        rating: 1000,
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
            seq: player,
          },
        },
      });
    },
    UpdatePlayerInfo: (_, { seq, name, phone, email }, { prisma }) => {
      return prisma.updatePlayer({
        data: {
          name,
          phone,
          email,
        },
        where: {
          seq,
        },
      });
    },
    UpdatePlayersTeamInfo: (_, { seq, teamUniqueId }, { prisma }) => {
      return prisma.updatePlayer({
        data: {
          team: {
            connect: {
              teamUniqueId,
            },
          },
        },
        where: {
          seq,
        },
      });
    },
    DeleteNotifier: (_, { seq }, { prisma }) => {
      return prisma.deleteNotifier({ seq });
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
    uploadMatchList: ({ seq }, _, { prisma }, { variableValues }) => {
      return prisma.team({ seq }).uploadMatchList({
        where: {
          date_gte: variableValues.date,
        },
        orderBy: 'date_ASC',
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
    applyingList: ({ seq }, _, { prisma }) => {
      return prisma.player({ seq }).applyingList();
    },
  },
  Notifier: {
    player: ({ seq }, _, { prisma }) => {
      return prisma.notifier({ seq }).player();
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
  MatchConnection: {
    hasNext: (root, _, { prisma }) => {
      return root.pageInfo.hasNextPage;
    },
  },
};

module.exports = resolvers;
