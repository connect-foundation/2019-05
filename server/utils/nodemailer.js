const nodemailer = require('nodemailer');
const smtpPool = require('nodemailer-smtp-pool');
const { env } = process;
const TRANSPORT_CONFIG = {
  service: 'Gmail',
  host: 'localhost',
  port: env.EMAIL_PORT,
  auth: {
    user: env.EMAIL_USER,
    pass: env.EMAIL_PW,
  },
  tls: {
    rejectUnauthorize: false,
  },
  maxConnections: 20,
  maxMessages: 20,
};

const mailSender = {
  mailOptions: { from: 'we.underdoggs@gmail.com' },
  transporter: nodemailer.createTransport(smtpPool(TRANSPORT_CONFIG)),
  fireMail({ to, subject, html }) {
    this.mailOptions = { ...this.mailOptions, to, subject, html };
    this.transporter.sendMail(this.mailOptions, (err, res) => {
      if (err) console.error();
    });
  },
};

module.exports = mailSender;
