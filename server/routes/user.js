const jwt = require('jsonwebtoken');
const express = require('express');
const user = express.Router();
const { env } = process;
const { prisma } = require('../generated/prisma-client');

user.get('/', (req, res) => {
  const token = req.cookies.jwt;
  const userInfo = jwt.verify(token, env.JWT_SECRET);
  res.send(userInfo);
});

user.get('/info', async (req, res) => {
  const token = req.cookies.jwt;
  const userInfo = jwt.verify(token, env.JWT_SECRET);
  const { playerId } = userInfo;
  const players = await prisma.players({where: {playerId}});
  if(!players.team) {
    res.send('아직 팀정보 입력 전이요 ㅅㄱ');
  }
  res.send(players);
});

// prisma test용 api
user.get('/test', async (req, res) => {
  const players = await prisma.players();
  res.send(players);
});

module.exports = user;
