const { env } = process;
const webpush = require('web-push');
<<<<<<< HEAD

const keyMap = {}; // 객체 키 => id, 속성 => publickey, privateKey
const subscriptionMap = {};
=======
const axios = require('axios');
const mailSender = require('../../utils/nodemailer');
const keyMap = []; // 객체 키 => id, 속성 => publickey, privateKey
const makeMsgContent = require('../../utils/makeMsgContent');
const makeMailContent = require('../../utils/makeMailContent');
>>>>>>> 6927d0d9d2b6b027355b55c724a20d2e55d4d3d4

const createVapIdKey = () => {
  return webpush.generateVAPIDKeys();
};

const setUpVapIdKey = (id) => {
  keyMap[id] = { ...createVapIdKey() };
  webpush.setVapidDetails(
    `${process.env.DOMAIN}`,
    keyMap[id].publicKey,
    keyMap[id].privateKey
  );
};

const getVapPublicId = (req, res) => {
  const userId = req.body.userId;
  if (!userId) {
    res.sendStatus(400);
  }
  if (!keyMap[userId]) {
    setUpVapIdKey(userId);
  }
  res.status(201).json({ publicKey: keyMap[userId].publicKey });
};

const sendPushNotification = (req, res) => {
  const sub = req.body.subscription;
  webpush
    .sendNotification(sub)
    .then(() => {
      res.sendStatus(200);
    })
    .catch((err) => {
      res.status(500).json({ errorMsg: err });
    });
};

const getSubscription = (req, res) => {
  const foundId = req.body.userId;
  if (!foundId) {
    res.sendStatus(400);
  }
  res.status(200).json({ subscription: subscriptionMap[foundId] });
};

const setSubscription = (req, res) => {
  const myId = req.body.userId;
  if (!myId) {
    res.sendStatus(400);
  }
  subscriptionMap[myId] = req.body.subscription;
  Object.keys(subscriptionMap).forEach((k) => {
    console.log(k);
    console.log(subscriptionMap[k]);
  });
  res.sendStatus(201);
};

const sendEmailNotification = (req, res, next) => {
  console.log('email middleware !');
  const { host } = req.body.matchInfo;
  const to = ['seungnam2@gmail.com'];
  const subject = `${host.name}팀으로부터 대결 신청이 왔습니다. `;
  const html = makeMailContent(req.body.matchInfo);
  const emailOption = { to, subject, html };
  mailSender.fireMail(emailOption);
  next();
};

const sendSMSNotification = async (req, _, next) => {
  const content = makeMsgContent(req.body.matchInfo);
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
    from: '01051141777',
    to: ['01051141777'],
    content,
  };
  try {
    //const result = await axios.post(URL, JSON.stringify(requestBody), headerOp);
  } catch (e) {
    console.error(e);
  }
  next();
};
module.exports = {
  sendPushNotification,
  getVapPublicId,
  getSubscription,
<<<<<<< HEAD
  setSubscription,
=======
  sendEmailNotification,
  sendSMSNotification,
>>>>>>> 6927d0d9d2b6b027355b55c724a20d2e55d4d3d4
};
