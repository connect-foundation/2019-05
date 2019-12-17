const jwt = require('jsonwebtoken');
const { env } = process;
const { prisma } = require('../../generated/prisma-client');
const getUserAndTeam = require('../../utils/getUserAndTeam');

const getUserInfo = (req, res) => {
  const token = req.headers.authorization || req.cookies.jwt;
  try {
    const userInfo = jwt.verify(token, env.JWT_SECRET);
    res.status(200).json({ status: 200, userInfo });
  } catch {
    res.status(401).json({ msg: 'jwt 확인에 문제가 있습니다.' });
  }
};

const getTeamInfo = async (req, res) => {
  const token = req.headers.authorization || req.cookies.jwt;
  try {
    const userInfo = jwt.verify(token, env.JWT_SECRET);
    const { authProvider, playerId } = userInfo;
    const [ player ] = await prisma.players({ where: { authProvider, playerId }});
    const userAndTeamInfo = await getUserAndTeam(player.seq);
    const { team } = userAndTeamInfo;
    if (!team) {
      res.status(200).json({ msg: '아직 팀정보 입력 전이요 ㅅㄱ' });
      return;
    }
    res.status(200).json({ userAndTeamInfo });
  } catch {
    res.status(401).json({ msg: 'jwt 확인에 문제가 있습니다.' });
  }
};

module.exports = { getUserInfo, getTeamInfo };
