

const resolvers = {
    Query: {
        Matches: (root, args, {prisma}) => {
            return prisma.matches({})
        },
        Match: (_, args, {prisma}) => {
            return prisma.match({
                seq: args.seq,
            })
        },
        Teams: (root, args, {prisma}) => {
            return prisma.teams();
        },
        Team: (root, args, {prisma}) => {
            return prisma.team({
                seq: args.seq
            });
        },
        Players: (root, args, {prisma}) => {

        },
        Player: (root, args, {prisma}) => {
            return prisma.player({
                seq: args.seq
            })
        }
    },
    Match: {
        host: (o,_,{prisma}) => {
           return prisma.match({seq:o.seq}).host();
        },
    },
    Team: {
        seq: o => o.seq,
        name: o => o.name,
        logo: o => o.logo,
        home_area: o => o.home_area,
        introduction: o => o.introduction
    }
};

module.exports = resolvers;