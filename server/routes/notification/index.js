const express = require('express');
const notification = express.Router();
const {
  sendPushNotification,
  getVapPublicId,
  getSubscription,
  sendEmailNotification,
  sendSMSNotification,
} = require('./controller');

notification.post(
  '/sendNotification',
  sendEmailNotification,
  sendSMSNotification,
  sendPushNotification
);

notification.get('/vapidPublicKey', getVapPublicId);

notification.get('/subscription', getSubscription);

module.exports = notification;
