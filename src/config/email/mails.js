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

const forgotPassword = (to, url) => {
  const mailOptions = {
    from: 'dillydot22@gmail.com',
    to,
    subject: 'Forgot Password',
    text: `Kindly click on this link ${url} to reset your password, link expires in 10mins`
  };
  transporter.sendMail(mailOptions, (err) => {
    if (err) {
      logger.error('mail sending failed', err.message);
      return err;
    }
  });
};
const resetPassword = (to) => {
  const mailOptions = {
    from: 'dillydot22@gmail.com',
    to,
    subject: 'Password Reset Successful',
    text: 'You have successfully reset your password, kindly proceed to login'
  };
  transporter.sendMail(mailOptions, (err) => {
    if (err) {
      logger.error('mail sending failed', err.message);
      return err;
    }
  });
};
const bookTrip = (to, origin, destination, tripId, bookingId, seatNumber, tripDate) => {
  const mailOptions = {
    from: 'dillydot22@gmail.com',
    to,
    subject: 'Trip booked successfully',
    text: `your booking to ${destination} from ${origin} was successful. Kindly find your booking details below:
        Trip ID: ${tripId},
        Booking ID: ${bookingId},
        Seat Number: ${seatNumber},
        Trip Date: ${tripDate}
        please provide the above details on your arrival
    `
  };
  transporter.sendMail(mailOptions, (err) => {
    if (err) {
      logger.error('mail sending failed', err.message);
      return err;
    }
  });
};



export default {
  sendSignUp,
  forgotPassword,
  resetPassword,
  bookTrip
};
