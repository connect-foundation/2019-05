const express = require('express');
const notification = express.Router();
const {
  sendPushNotification,
  getVapPublicId,
  getSubscription,
  setSubscription,
} = require('./controller');

notification.post('/sendNotification', sendPushNotification);

notification.post('/vapidPublicKey', getVapPublicId);

notification.post('/findSubscription', getSubscription);

notification.post('/registSubscription', setSubscription);

module.exports = notification;
