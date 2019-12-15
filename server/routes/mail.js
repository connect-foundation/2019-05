const express = require('express');
const router = express.Router();
const mailSender = require('../utils/nodemailer');
const template = require('../utils/mailTemplate');
router.get('/', (req, res, next) => {
  mailSender.fireMail({
    to: ['seungnam2@gmail.com'],
    subject: 'seungnam',
    html: template,
  });
  res.json({ result: 'ok', msg: 'The email has successfully sent.' });
});

router.post('/', function(req, res, next) {
  const { date, startTime, endTime, host, stadium, area } = req.body.matchInfo;
  const template = `
    <ul>
      <li>date:${date}</li>
      <li>startTime:${startTime}</li>
      <li>endTime:${endTime}</li>
      <li>host name:${host.name}</li> 
      <li>stadium:${stadium}</li>
      <li>area:${area}</li>
    </ul>
  `;
  mailSender.fireMail({
    to: ['seungnam2@gmail.com'],
    subject: host.name,
    html: template,
  });
  res.json({ result: 'ok', msg: 'The email has successfully sent.' });
});

module.exports = router;
