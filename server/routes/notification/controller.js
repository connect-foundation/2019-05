const webpush = require('web-push');

let subscription;

const setUpVapIdKey = () => {
  if (!process.env.VAPID_PUBLIC_KEY || !process.env.VAPID_PRIVATE_KEY) {
    const keys = webpush.generateVAPIDKeys();
    process.env.VAPID_PUBLIC_KEY = keys.publicKey;
    process.env.VAPID_PRIVATE_KEY = keys.privateKey;
  }
  webpush.setVapidDetails(
    'http://127.0.0.1:4000',
    process.env.VAPID_PUBLIC_KEY,
    process.env.VAPID_PRIVATE_KEY
  );
};

const sendPushNotification = (req, res) => {
  const sub = req.body.subscription;
  console.log(sub);
  webpush
    .sendNotification(sub)
    .then(() => {
      res.sendStatus(201);
    })
    .catch((err) => {
      res.status(500).json({ errorMsg: err });
    });
};

const getVapPublicId = (req, res) => {
  setUpVapIdKey();
  res.json({ publicKey: process.env.VAPID_PUBLIC_KEY });
};

const registSubscription = (req, res) => {
  subscription = req.body.subscription;
  res.status(201).json({ success: true });
};

const getSubscription = (req, res) => {
  if (!subscription) {
    res.status(201).json({ subscription: undefined });
  }
  res.status(201).json({ subscription });
};

module.exports = {
  sendPushNotification,
  getVapPublicId,
  registSubscription,
  getSubscription,
};
