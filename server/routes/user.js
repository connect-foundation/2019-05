const jwt = require('jsonwebtoken');
const express = require('express');
const user = express.Router();
const { env } = process;

user.get('/', (req, res) => {
  const token = req.cookies.jwt;
  const userInfo = jwt.verify(token, env.JWT_SECRET);
  /*
  QuickKick 회원 DB에 저장되어 있는지 검사하는 부분 필요
   */
  res.send(userInfo);
});

module.exports = user;
