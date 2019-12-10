const jwt = require('jsonwebtoken');
const { env } = process;

const getPlayersTeam = async (req, res) => {
  const token = req.cookies.jwt;
  try {
    const userInfo = jwt.verify(token, env.JWT_SECRET);
    if(userInfo.team) res.status(200).json({status: 200, msg: userInfo.team});
    else res.status(400).json({status: 400, msg: '팀 좀 만들어라'});
  } catch {
    res.status(400).json({msg:'jwt 확인에 문제가 있습니다.'});
  }
};

module.exports = { getPlayersTeam };
