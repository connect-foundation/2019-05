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
    rejectUnauthorize: false,
  },
  maxConnections: 10,
  maxMessages: 10,
};
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: env.EMAIL_USER,
    pass: env.EMAIL_PW,
  },
});
const mailSender = {
  mailOptions: { from: env.UNDERDOGGS_EMAIL_ADDR },
  // transporter,
  transporter: nodemailer.createTransport(smtpPool(TRANSPORT_CONFIG)),
  fireMail({ to, subject, html }) {
    this.mailOptions = { ...this.mailOptions, to, subject, html };
    this.transporter.sendMail(this.mailOptions, (err, res) => {
      if (err) console.error();
      console.log(`email has been sent!`);
    });
  },
};

module.exports = mailSender;
