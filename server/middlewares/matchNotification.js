require('dotenv').config({ path: '../.env.development' });
const { prisma } = require('../generated/prisma-client');

const findNotifier = async (date, startTime, endTime, area) => {
  const result = await prisma.notifiers({
    where: {
      date,
      startTime_lte: startTime,
      endTime_gte: endTime,
    },
  });
  console.log('result: ', result);
  const notifierSeqArray = filterArea(result, area);
  const playerList = await prisma
    .notifiers({
      where: {
        seq_in: notifierSeqArray,
      },
    })
    .player();
  console.log('playerList: ', playerList);
  // 알림을 받을 새끼들
  return playerList.reduce((acc, val) => {
    if (
      acc.findIndex((value) => {
        return value.player.seq === val.player.seq;
      }) === -1
    ) {
      acc.push(val);
    }
    return acc;
  }, []);
};

const filterArea = (notiArray, areaString) => {
  return notiArray.reduce((acc, val) => {
    if (val.area.findIndex((areaValue) => areaValue === areaString) !== -1) {
      acc.push(val.seq);
    }
    return acc;
  }, []);
};

module.exports = findNotifier;

// 이 때 알림을 받고 싶다.
findNotifier('2019-12-30', '13:00', '14:00', 'SPA');
