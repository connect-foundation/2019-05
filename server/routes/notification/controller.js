const webpush = require('web-push');

const keyMap = []; // 객체 키 => id, 속성 => publickey, privateKey

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
  if (!subscription) {
    res.sendStatus(400);
  }
  res.status(201).json({ subscription });
};

module.exports = {
  sendPushNotification,
  getVapPublicId,
  getSubscription,
};
