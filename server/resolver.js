

const resolvers = {
    Query: {
        Matches: (_, {seq,area,host}, {prisma}) => {
            return prisma.matches({
              where: {
                  seq,
                  area,
                  host: {
                      seq: host
                  }

              }
            });
        },
        PendingMatches: (_, {host}, {prisma}) => {
            return prisma.matches({
              where: {
                  host,
                  guest: null
              }
            })
        },
        Match: (_, {seq}, {prisma}) => {
            return prisma.match({ seq });
        },
        Teams: (_, {seq}, {prisma}) => {
            return prisma.teams({
              where: {
                  seq
              }
            });
        },
        Team: (_, {seq}, {prisma}) => {
            return prisma.team({seq});
        },
        Players: (_, args, {prisma}) => {

        },
        Player: (_, args, {prisma}) => {
            return prisma.player({
                seq: args.seq
            })
        }
    },
    Match: {
        host: ({seq}, _ ,{prisma}) => {
           return prisma.match({seq}).host();
        },
        guest: ({seq}, _ ,{prisma}) => {
            return prisma.match({seq}).guest();
        }
    },
    Team: {
        members: ({seq}, _, {prisma}) => {
            return prisma.team({seq}).members();
        },
        uploadMatchList: ({seq}, _, {prisma}) => {
            return prisma.team({seq}).uploadMatchList();
        },
        matchingDoneList: ({seq}, _, {prisma}) => {
        return prisma.team({seq}).matchingDoneList();
        },
        onApplyingList: ({seq}, _, {prisma}) => {
        return prisma.team({seq}).onApplyingList();
        }
    }
};

module.exports = resolvers;