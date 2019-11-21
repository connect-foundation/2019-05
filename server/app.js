require('dotenv').config();
const createError = require('http-errors');
const express = require('express');
const { GraphQLServer } = require('graphql-yoga');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const resolvers = require('./resolver');
const { prisma } = require('./generated/prisma-client');


const server = new GraphQLServer({
  typeDefs: './schema.graphql',
  resolvers,
  context: { prisma }
});

const app = server.express;

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

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


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});


//module.exports = app;
