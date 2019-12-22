require('dotenv').config({ path: '../.env.development' });
const { env } = process;
const { prisma } = require('../generated/prisma-client');
const mailSender = require('../utils/nodemailer');
const subscriptionMap = require('../utils/subscriptionMap');
const webpush = require('web-push');
const axios = require('axios');
const _ = require('lodash');
const convertDistrictCode = require('../utils/district');

const findNotifier = async (date, startTime, endTime, area) => {
  const result = await prisma.notifiers({
    where: {
      date,
      startTime_lte: startTime,
      endTime_gte: endTime,
    },
  });
  const resultWithAreaInfo = result.filter((res) => res.area.includes(area));
  const notifierSeqArray = filterArea(resultWithAreaInfo, area);
  const playerList = await prisma
    .notifiers({
      where: {
        seq_in: notifierSeqArray,
      },
    })
    .player();
  const uniquePlayerList = _.uniqWith(playerList, _.isEqual);
  sendEmailNotification(uniquePlayerList);
  sendSMSNotification(uniquePlayerList, { date, startTime, endTime, area });
  sendWebpushNotification(uniquePlayerList);
};

const sendWebpushNotification = async (uniquePlayerList) => {
  for await (const player of uniquePlayerList) {
    const sub = subscriptionMap[player.player.playerId];
    try {
      await webpush.sendNotification(sub);
    } catch (error) {
      console.log(error);
    }
  }
};

const filterArea = (notiArray, areaString) => {
  return notiArray.reduce((acc, val) => {
    if (val.area.findIndex((areaValue) => areaValue === areaString) !== -1) {
      acc.push(val.seq);
    }
    return acc;
  }, []);
};

const sendEmailNotification = async (uniquePlayerList) => {
  const receivers = uniquePlayerList.map((playerObj) => playerObj.player.email);
  if (!receivers.length) return;
  const subject = `[퀵킥] 알림 신청하신 시간대에 매치가 등록되었습니다. `;
  const html =
    /*html*/
    `<p>매치를 보시려면 <a href="https://quickkick.site">여기를 클릭하세요</a></p>
  `;
  const emailOption = { to: receivers, subject, html };
  return await mailSender.fireMail(emailOption);
};

const sendSMSNotification = async (uniquePlayerList, matchInfo) => {
  const { date, startTime, area } = matchInfo;
  const receivers = uniquePlayerList.map((playerObj) =>
    playerObj.player.phone.replace(/-/g, '')
  );
  console.log(receivers, 'receivers');
  if (!receivers.length) return;
  const content = `[퀵킥 매치 알림] 
날짜: ${date}
시각: ${startTime < '12:00' ? '오전 ' : ''}${startTime}
위치: ${convertDistrictCode(area)} 

https://quickkick.site`;
  const serviceId = env.NAVER_SMS_API_ID;
  const headerOp = {
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
      'x-ncp-auth-key': env.NAVER_ACCOUNT_ACCESS_KEY,
      'x-ncp-service-secret': env.NAVER_SMS_API_SECRET_KEY,
    },
  };
  const URL = `https://api-sens.ncloud.com/v1/sms/services/${serviceId}/messages`;
  const requestBody = {
    type: 'SMS',
    from: env.UNDERDOGGS_PHONE,
    to: receivers,
    content,
  };
  try {
    const result = await axios.post(URL, JSON.stringify(requestBody), headerOp);
  } catch (e) {
    console.error(e);
  }
};

module.exports = findNotifier;
