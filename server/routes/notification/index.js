const express = require('express');
const notification = express.Router();
const {
  sendPushNotification,
  getVapPublicId,
  getSubscription,
  setSubscription,
  sendEmailNotification,
  sendSMSNotification,
} = require('./controller');
const bodyChecker = require('../../middlewares/bodyChecker');

notification.post(
  '/sendNotification',
  bodyChecker,
  sendEmailNotification,
  sendSMSNotification,
  sendPushNotification
);

notification.get('/vapidPublicKey', getVapPublicId);

notification.post('/findSubscription', bodyChecker, getSubscription);

notification.post('/registSubscription', bodyChecker, setSubscription);

module.exports = notification;
