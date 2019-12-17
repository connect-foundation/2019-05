const express = require('express');
const notification = express.Router();
const {
  sendPushNotification,
  getVapPublicId,
  registSubscription,
  getSubscription,
} = require('./controller');

notification.post('/register', registSubscription);

notification.post('/sendNotification', sendPushNotification);

notification.get('/vapidPublicKey', getVapPublicId);

notification.get('/subscription', getSubscription);

module.exports = notification;
