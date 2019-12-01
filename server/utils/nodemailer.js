const nodemailer = require('nodemailer');
const smtpPool = require('nodemailer-smtp-pool');

const TRANSPORT_CONFIG = {
  service: 'Gmail',
  host: 'localhost',
  port: '465',
  auth: {
    user: 'we.underdoggs@gmail.com',
    pass: 'underdoggs_05',
  },
  tls: {
    rejectUnauthorize: false,
  },
  maxConnections: 5,
  maxMessages: 10,
};

const mailSender = {
  mailOptions: { from: 'we.underdoggs@gmail.com' },
  transporter: nodemailer.createTransport(smtpPool(TRANSPORT_CONFIG)),
  setOptions({ to, subject, html }) {
    this.mailOptions.to = to;
    this.mailOptions.subject = subject;
    this.mailOptions.html = html;
    return this;
  },
  fireMail() {
    this.transporter.sendMail(this.mailOptions, (err, res) => {
      if (err) console.error();
      // this.transporter.close();
    });
  },
};

module.exports = mailSender;
