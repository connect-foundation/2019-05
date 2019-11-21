

const resolvers = {
    Query: {
        Matches: (root, args, {prisma}) => {
            return prisma.matches();
        },
        Match: (_, {seq, area}) => {},
        Teams: () => {},
        Team: (_, {seq}) => {},
        Players: () => {},
        Player: (seq) => {}
    }
};

module.exports = resolvers;