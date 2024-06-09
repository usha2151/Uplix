import nodemailer from 'nodemailer';
import db from '../database_Config/db.js';

export const sendEmail = (req, res) => {
    const { SmtpUserName, SmtpPassword, userId } = req.body; // Assuming these are received from the client-side
    console.log(SmtpUserName);
    console.log(SmtpPassword);
    console.log(userId);
    const sql = `SELECT first_name,last_name, email FROM userclients WHERE user_id = ?`;

    db.query(sql, [userId], (error, results) => {
        if (error) {
            console.error('Error querying database:', error);
            res.status(500).json({ success: false, message: 'Error fetching user details' });
            return;
        }

        // If user not found
        if (results.length === 0) {
            res.status(404).json({ success: false, message: 'User not found' });
            return;
        }

        results.forEach(user => {
            const userFName = user.first_name;
            const userLName = user.last_name;
            const userName = userFName + ' ' + userLName;
            const userEmail = user.email;
    
            console.log('User Name:', userName);
            console.log('User Email:', userEmail);

            let transporter = nodemailer.createTransport({
                service: 'Gmail',
                auth: {
                    user: SmtpUserName, 
                    pass: SmtpPassword 
                }
            });
    
            // Setup email data
            const mailOptions = {
                from: SmtpUserName,
                to: userEmail,
                subject: `Hello ${userName}, This is a Test Email`,
                text: 'Hello, this is a test email.',
                html: `<b>Hello ${userName}, this is a test email.</b>`
            };
    
            // Send mail with defined transport object
            transporter.sendMail(mailOptions, (error, info) => {
                if (error) {
                    console.error('Error sending email:', error);
                } else {
                    console.log('Email sent:', info.response);
                }
            });
        });
    
        res.status(200).json({ success: true, message: 'Emails sent successfully' });
    });
};
