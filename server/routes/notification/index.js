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

notification.post(
  '/sendNotification',
  sendEmailNotification,
  sendSMSNotification,
  sendPushNotification
);

notification.post('/vapidPublicKey', getVapPublicId);

notification.post('/findSubscription', getSubscription);

notification.post('/registSubscription', setSubscription);

module.exports = notification;
