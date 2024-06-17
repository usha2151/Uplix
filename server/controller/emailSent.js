import db from "../database_Config/db.js";
import nodemailer from 'nodemailer';
import dotenv from "dotenv";
dotenv.config();

export const checkFestivalForToday = () => {
  const query = `
    SELECT fl.festival_id, fl.festival_name, fl.festival_date
    FROM festival_list fl
    WHERE fl.festival_date = CURDATE();
  `;

  db.query(query, (error, results) => {
    if (error) {
      console.error('Error executing query:', error);
      return;
    }

    if (results.length === 0) {
      console.log('No festival for today.');
    } else {
      console.log('Festival for today:');
      let totalEmailsSent = 0; // Counter for emails sent
      let emailPromises = []; // Array to store promises for email sending

      results.forEach(festival => {
        const { festival_id, festival_name, festival_date } = festival;
        console.log(`Festival ID: ${festival_id}, Name: ${festival_name}, Date: ${festival_date}`);

        // Query festival emails for the current festival ID
        const festivalEmailsQuery = `
          SELECT festival_subject, festival_message
          FROM festival_emails
          WHERE festival_id = ?;
        `;

        db.query(festivalEmailsQuery, [festival_id], (emailError, emailResults) => {
          if (emailError) {
            console.error('Error fetching festival emails:', emailError);
            return;
          }

          if (emailResults.length === 0) {
            console.log('No emails found for this festival.');
          } else {
            console.log('Festival Emails:');
            emailResults.forEach(email => {
              const { festival_subject, festival_message } = email;
              console.log(`Subject: ${festival_subject}, Message: ${festival_message}`);

              // Query user and client details
              const userClientQuery = `
                SELECT uc.user_id, uc.first_name, uc.last_name, uc.email AS client_email, 
                       u.name, u.email, s.smtp_user, s.smtp_password
                FROM userclients uc
                JOIN auth u ON uc.user_id = u.id_auth
                LEFT JOIN user_smtp_details s ON uc.user_id = s.user_id 
                WHERE uc.status = 1;
              `;

              db.query(userClientQuery, (clientError, clientResults) => {
                if (clientError) {
                  console.error('Error fetching user and client details:', clientError);
                  return;
                }

                if (clientResults.length === 0) {
                  console.log('No users with clients found.');
                } else {
                  console.log('User and Client Details:');
                  clientResults.forEach(client => {
                    const { user_id, user_name, user_email, client_email, smtp_user, smtp_password } = client;

                    // Check if SMTP credentials are missing
                    if (!smtp_user || !smtp_password) {
                      console.log(`User Name: ${user_name} (ID: ${user_id}) has missing SMTP details. Sending email request.`);

                      // Send email to user requesting to add SMTP details
                      const missingSMTPMessage = `
                        <p>Hello ${user_name},</p>
                        <p>It seems you have not configured your SMTP details in your dashboard.</p>
                        <p>Please log in to your dashboard and add your SMTP username and password to ensure that your festival emails are delivered successfully to your clients.</p>
                        <p>Thank you!</p>
                      `;

                      let mailOptions = {
                        from: process.env.smtp_user, // sender address
                        to: user_email, // user's email address
                        subject: 'Missing SMTP Details', // Subject line
                        html: missingSMTPMessage // HTML message body
                      };

                      // Send email requesting to add SMTP details
                      let transporter = nodemailer.createTransport({
                        host: 'smtp.gmail.com',
                        port: 587,
                        secure: false,
                        auth: {
                          user: process.env.smtp_user,
                          pass: process.env.smtp_password
                        }
                      });

                      transporter.sendMail(mailOptions, (error, info) => {
                        if (error) {
                          console.error(`Error sending missing SMTP details email to ${user_email}:`, error);
                        } else {
                          console.log(`Email requesting to add SMTP details sent to ${user_email}: ${info.response}`);
                        }
                      });
                    } else {
                      // Check if the user has selected the current festival
                      const userFestivalQuery = `
                        SELECT id FROM user_festivals_selection 
                        WHERE user_id = ? AND festival_id = ?;
                      `;

                      db.query(userFestivalQuery, [user_id, festival_id], (userFestivalError, userFestivalResults) => {
                        if (userFestivalError) {
                          console.error('Error fetching user festival selection:', userFestivalError);
                          return;
                        }

                        if (userFestivalResults.length === 0) {
                          console.log(`User ID: ${user_id} has not selected the festival ID: ${festival_id}.`);
                        } else {
                          // Function to fetch email signature details
                          const fetchEmailSignatureDetails = (user_id) => {
                            return new Promise((resolve, reject) => {
                              const query = 'SELECT `signature_id`, `user_id`, `name`, `designation`, `phone`, `email`, `company`, `street`, `city`, `zipCode`, `country`, `website` FROM `user_email_signature` WHERE `user_id` = ?';
                              db.query(query, [user_id], (error, results) => {
                                if (error) return reject(error);
                                if (results.length === 0) return reject('No signature found for the given user_id');
                                resolve(results[0]);
                              });
                            });
                          };

                          fetchEmailSignatureDetails(user_id)
                            .then(signature => {
                              // Construct the email signature using fetched details
                              const emailSignature = `
                                <div style="font-family: Arial, sans-serif; color: #333;">
                                  <p>${signature.name}</p>
                                  <p>${signature.designation}</p>
                                  <p>Mobile: ${signature.phone}</p>
                                  <p>Email: <a href="mailto:${signature.email}">${signature.email}</a></p>
                                  <p>${signature.company}, ${signature.street}, ${signature.city}, ${signature.zipCode}, ${signature.country}</p>
                                  <p><a href="${signature.website}">${signature.website}</a></p>
                                </div>
                              `;

                              // Define email options
                              let mailOptions = {
                                from: smtp_user, // sender address
                                to: client_email, // list of receivers
                                subject: festival_subject, // Subject line
                                text: festival_message, // plain text body
                                html: `
                                  <div>
                                    <p>${festival_message}</p>
                                    <br>
                                    ${emailSignature}
                                  </div>
                                `
                              };

                              // Send email and add promise to the array
                              emailPromises.push(
                                new Promise((resolve, reject) => {
                                  let transporter = nodemailer.createTransport({
                                    host: 'smtp.gmail.com', // or your SMTP server
                                    port: 587,
                                    secure: false, // true for 465, false for other ports
                                    auth: {
                                      user: smtp_user,
                                      pass: smtp_password
                                    }
                                  });

                                  transporter.sendMail(mailOptions, (error, info) => {
                                    if (error) {
                                      console.error(`Error sending email to ${client_email}:`, error);
                                      reject(error);
                                    } else {
                                      console.log(`Email sent to ${client_email}: ${info.response}`);
                                      totalEmailsSent++; // Increment the counter
                                      resolve();
                                    }
                                  });
                                })
                              );
                            })
                            .catch(error => {
                              console.error('Error fetching email signature details:', error);
                            });
                        }
                      });
                    }
                  });
                }
              });
            });
          }
        });
      });

      // Wait for all emails to be sent and then log the total count
      Promise.all(emailPromises).then(() => {
        console.log(`Total emails sent: ${totalEmailsSent}`);
      }).catch((err) => {
        console.error('Error in sending some emails:', err);
      });
    }
  });
};
