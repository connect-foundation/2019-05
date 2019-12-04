const express = require('express');
const router = express.Router();
const mailSender = require('../utils/nodemailer');
/* GET home page. */
// router.get('/', function(req, res, next) {
//   mailSender
//     .setOptions({
//       to: ['seungnam2@gmail.com', 'dhorlawhddbs@naver.com'],
//       subject: 'correction',
//       html: '<h1>thanks for the invitation</h1>',
//     })
//     .fireMail();
//   res.send('done!');
// });

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
        'we.underdoggs@gmail.com',
        'eastgerm_8@naver.com',
        'dhorlawhddbs@naver.com',
        'bigrsnboy@naver.com',
      ],
      subject: host.name,
      html: template,
    })
    .fireMail();
  res.status(200).json({
    id: 1,
  });
});
module.exports = router;
