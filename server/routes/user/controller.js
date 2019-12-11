const jwt = require('jsonwebtoken');
const { env } = process;
const { prisma } = require('../../generated/prisma-client');

const getUserInfo = (req, res) => {
  const token = req.cookies.jwt;
  try {
    console.log(token);
    const userInfo = jwt.verify(token, env.JWT_SECRET);
    res.status(200).json({status: 200, userInfo});
  } catch {
    res.status(400).json({msg:'jwt 확인에 문제가 있습니다.'});
  }
};

const isSignUp = async (req, res) => {
  const token = req.cookies.jwt;
  const userInfo = jwt.verify(token, env.JWT_SECRET);
  const { playerId } = userInfo;
  const players = await prisma.players({where: {playerId}});
  if(!players.team) {
    res.send('아직 팀정보 입력 전이요 ㅅㄱ');
    return ;
  }
  res.send(players);
};

module.exports = { getUserInfo, isSignUp };