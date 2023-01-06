/* eslint-disable consistent-return */
import nodemailer from 'nodemailer';
import config from '../../config/index.js';

let transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    type: 'OAuth2',
    user: config.WAYFARER_MAIL_USERNAME,
    pass: config.WAYFARER_MAIL_PASSWORD,
    clientId: config.WAYFARER_OAUTH_CLIENTID,
    clientSecret: config.WAYFARER_OAUTH_CLIENT_SECRET,
    refreshToken: config.WAYFARER_OAUTH_REFRESH_TOKEN
  }
});

const sendSignUp = (to, url) => {
  const mailOptions = {
    from: 'dillydot22@gmail.com',
    to,
    subject: 'Verify Email Address',
    text: `Welcome to Explorers Trip Zone click on this link ${url} to verify your email and complete your signup process`
  };
  transporter.sendMail(mailOptions, (err) => {
    if (err) {
      logger.error('mail sending failed', err.message);
      return err;
    }
  });
};




export default {
  sendSignUp  
};
