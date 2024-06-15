import db from '../database_Config/db.js';
import bodyParser from 'body-parser';
import bcrypt from 'bcrypt';
import nodemailer from 'nodemailer';

export const sendEmail = async (req, res) => {
    const { SmtpUserName, SmtpPassword, userId } = req.body;


    // Query to check if the SMTP details already exist for the given user_id
    const checkQuery = `SELECT * FROM user_smtp_details WHERE user_id = ?`;

    db.query(checkQuery, [userId], async (checkErr, checkResults) => {
        if (checkErr) {
            console.error('Error checking existing SMTP details:', checkErr);
            res.status(500).json({ success: false, message: 'Error checking existing SMTP details' });
            return;
        }

        if (checkResults.length > 0) {
            // SMTP details already exist for this user_id
            res.status(400).json({ success: false, message: 'SMTP details already exist for this user. Please update instead.' });
        } else {
            // Verify SMTP credentials
            let transporter = nodemailer.createTransport({
                host: 'smtp.gmail.com', // Replace with your actual SMTP server host
                port: 587, // Or the appropriate port
                secure: false, // true for 465, false for other ports
                auth: {
                    user: SmtpUserName,
                    pass: SmtpPassword
                }
            });

            // Test email options
            let mailOptions = {
                from: SmtpUserName,
                to: SmtpUserName,
                subject: 'SMTP Verification Test',
                text: 'If you received this email, your SMTP settings are correct!'
            };

            try {
                // Test email sending
                await transporter.sendMail(mailOptions);

                // Encrypt the SMTP password before saving
                // const hashedPassword = await bcrypt.hash(SmtpPassword, 10);

                // SMTP details do not exist, proceed with insertion
                const insertQuery = `INSERT INTO user_smtp_details (user_id, smtp_user, smtp_password) VALUES (?, ?, ?)`;

                db.query(insertQuery, [userId, SmtpUserName, SmtpPassword], (insertErr, insertResults) => {
                    if (insertErr) {
                        console.error('Error inserting SMTP details:', insertErr);
                        res.status(500).json({ success: false, message: 'Error inserting SMTP details' });
                        return;
                    }
                    res.json({ success: true, message: 'SMTP details verified and added successfully' });
                });
            } catch (error) {
                console.error('SMTP verification failed:', error);
                res.json({ success: false, message: 'SMTP credentials are invalid!', error: error.message });
            }
        }
    });
};
