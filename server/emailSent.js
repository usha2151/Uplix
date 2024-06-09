import db from '../database_Config/db.js';
import nodemailer from 'nodemailer';
import cron from 'node-cron';

// Email configuration
const transporter = nodemailer.createTransport({
  host: 'smtp.your_email_provider.com',
  port: 587,
  secure: false, // true for 465, false for other ports
  auth: {
    user: 'boby.swaroop317@gmail.com',
    pass: 'atfc uylp ifkx gcvn'
  }
});

const sendEmail = (subject, message, toEmail) => {
  const mailOptions = {
    from: 'bobyswaroop55024@gmail.com',
    to: toEmail,
    subject: subject,
    text: message
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return console.log(error);
    }
    console.log('Message sent: %s', info.messageId);
  });
};

export const checkAndSendFestivalEmails = () => {
  const currentDate = new Date().toISOString().slice(0, 10);

  const query = `
  SELECT fe.festival_subject, fe.festival_message, u.user_email
  FROM festival_emails fe
  JOIN festival_list fl ON fe.festival_id = fl.festival_id
  JOIN users u ON uc.user_id = u.user_id
  WHERE fl.festival_date = '2024-05-08';
  
  `;

  db.query(query, [currentDate], (error, results) => {
    if (error) {
      return console.error(error);
    }

    results.forEach((row) => {
      sendEmail(row.festival_subject, row.festival_message, row.email);
    });
  });
};

// Schedule the job to run every day at 5 PM
cron.schedule('6 17 * * *', checkAndSendFestivalEmails);
