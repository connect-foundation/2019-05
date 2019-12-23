const nodemailer = require('nodemailer');
const smtpPool = require('nodemailer-smtp-pool');
const { env } = process;

const TRANSPORT_CONFIG = {
  service: 'gmail',
  host: 'smtp.gmail.com',
  port: env.EMAIL_PORT,
  secure: true,
  auth: {
    user: env.EMAIL_USER,
    pass: env.EMAIL_PW,
  },
  tls: {
    rejectUnauthorized: false,
  },
  maxConnections: 10,
  maxMessages: 10,
};

const mailSender = {
  mailOptions: { from: env.UNDERDOGGS_EMAIL_ADDR },
  transporter: nodemailer.createTransport(smtpPool(TRANSPORT_CONFIG)),
  fireMail({ to, subject, html }) {
    this.mailOptions = { ...this.mailOptions, to, subject, html };
    this.transporter.sendMail(this.mailOptions, (err, _) => {
      if (err) console.error();
      console.log(`email has been sent!`);
    });
  },
};

module.exports = mailSender;
