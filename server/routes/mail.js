const express = require('express');
const router = express.Router();
const mailSender = require('../utils/nodemailer');
/* GET home page. */
router.get('/', function(req, res, next) {
  mailSender
    .setOptions({
      to: ['seungnam2@gmail.com', 'bigrsnboy@naver.com'],
      subject: 'correction',
      html: '<h1>thanks for the invitation</h1>',
    })
    .fireMail();
  res.send('done!');
});

module.exports = router;
