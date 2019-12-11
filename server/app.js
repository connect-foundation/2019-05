require('dotenv').config({
  path: `.env.${process.env.NODE_ENV}`,
});
const express = require('express');
const { GraphQLServer } = require('graphql-yoga');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const resolvers = require('./resolver');
const { prisma } = require('./generated/prisma-client');
const passport = require('./middlewares/passport');
const authRouter = require('./routes/auth');
const errorRouter = require('./routes/error');
const createError = require('./middlewares/createError');
const mailRouter = require('./routes/mail');
const userRouter = require('./routes/user');
const myTeamRouter = require('./routes/myTeam');
const cors = require('cors');
const server = new GraphQLServer({
  typeDefs: './schema.graphql',
  resolvers,
  context: { prisma },
});

const app = server.express;

app.use(cors());

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(passport.initialize());

app.use('/auth', authRouter);
app.use('/mail', mailRouter);
app.use('/user', userRouter);
app.use('/myTeam', myTeamRouter);

server.start(
  {
    port: 4000,
    endpoint: '/graphql',
    playground: '/playground',
  },
  ({ port }) => console.log(`QuickKick API Server is opened on ${port}`)
);

//app.use(createError);
//app.use(errorRouter);
