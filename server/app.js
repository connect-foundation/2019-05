require('dotenv').config();
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

const server = new GraphQLServer({
  typeDefs: './schema.graphql',
  resolvers,
  context: { prisma }
});

const app = server.express;

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(passport.initialize());

app.use('/auth', authRouter);

server.express.get('/', (req, res, next)=>{
  return res.send('hello');
});
server.express.use('/auth', (req, res, next) => {
  return res.send('ok');
});

server.start({
  port: 4000,
  endpoint: '/graphql',
  playground: '/playground',
},({ port })=> console.log(`${port} open`));

app.use(createError);
app.use(errorRouter);
