const { env } = process;
const webpush = require('web-push');
const axios = require('axios');
const subscriptionMap = require('../../utils/subscriptionMap');
const mailSender = require('../../utils/nodemailer');
const makeMsgContent = require('../../utils/makeMsgContent');
const makeMailContent = require('../../utils/makeMailContent');

const HOST_STATUS_LOGOUT = 410;

const getVapPublicId = (req, res) => {
  if (!process.env.PUBLIC_KEY || !process.env.PRIVATE_KEY) {
    const keys = webpush.generateVAPIDKeys();
    process.env.PUBLIC_KEY = keys.publicKey;
    process.env.PRIVATE_KEY = keys.privateKey;
    webpush.setVapidDetails(
      `${process.env.DOMAIN}`,
      process.env.PUBLIC_KEY,
      process.env.PRIVATE_KEY
    );
  }
  res.status(201).json({ publicKey: process.env.PUBLIC_KEY });
};

const sendPushNotification = async (req, res) => {
  const sub = req.body.subscription;
  try {
    await webpush.sendNotification(sub);
    res.sendStatus(200);
  } catch (error) {
    if (error.statusCode === HOST_STATUS_LOGOUT) {
      res.sendStatus(200);
      return;
    }
  }
};

const getSubscription = (req, res) => {
  const foundId = req.body.userId;
  res.status(200).json({ subscription: subscriptionMap[foundId] });
};

const setSubscription = (req, res) => {
  const myId = req.body.userId;
  subscriptionMap[myId] = req.body.subscription;
  console.log(subscriptionMap);
  res.sendStatus(201);
};

// 매치 신청을 했을 때 매치 주인(갑)에게 보내는 이메일 ---email---
const sendEmailNotification = async (req, _, next) => {
  const { playerInfo } = req.body;
  const { author } = req.body.matchInfo;
  const to = author.email;
  const subject = makeMailContent(playerInfo).subject;
  const html = makeMailContent(playerInfo).content;
  const emailOption = { to, subject, html };
  await mailSender.fireMail(emailOption);
  next();
};

// 매치 신청을 했을 때 매치 주인(갑)에게 보내는 문자메세지 ---sms---
const sendSMSNotification = async (req, _, next) => {
  const { playerInfo, matchInfo } = req.body;
  const content = makeMsgContent(matchInfo, playerInfo);
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
    to: [matchInfo.author.phone.replace(/-/g, '')],
    content,
  };
  try {
    // 여기를 주석처리하면 문자메세지가 전송이 되지 않는다.
    const result = await axios.post(URL, JSON.stringify(requestBody), headerOp);
  } catch (e) {
    console.error(e);
  }
  next();
};
module.exports = {
  sendPushNotification,
  getVapPublicId,
  getSubscription,
  setSubscription,
  sendEmailNotification,
  sendSMSNotification,
};
