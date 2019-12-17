const express = require('express');
const notification = express.Router();
const {
  sendPushNotification,
  getVapPublicId,
  getSubscription,
} = require('./controller');

notification.post('/sendNotification', sendPushNotification);

notification.get('/vapidPublicKey', getVapPublicId);

notification.get('/subscription', getSubscription);

module.exports = notification;
