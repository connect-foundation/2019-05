const express = require('express');
const router = express.Router();
const mailSender = require('../utils/nodemailer');
<<<<<<< HEAD
/* GET home page. */
router.get('/', function(req, res, next) {
  mailSender
    .setOptions({
      to: ['seungnam2@gmail.com', 'bigrsnboy@naver.com'],
      subject: 'correction',
      html: '<h1>thanks for the invitation</h1>',
=======

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
  mailSender
    .setOptions({
      to: [
        // 'we.underdoggs@gmail.com',
        // 'eastgerm_8@naver.com',
        // 'dhorlawhddbs@naver.com',
        // 'bigrsnboy@naver.com',
        'seungnam2@gmail.com',
      ],
      subject: host.name,
      html: template,
>>>>>>> 23b27e0946f15d5e1bad5b6bcab927032b3ae301
    })
    .fireMail();
  res.send('done!');
});

module.exports = router;
