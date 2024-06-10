import db from "../database_Config/db.js";
import jwt from 'jsonwebtoken';
import nodemailer from "nodemailer";
import bcrypt from 'bcrypt';

// Create Nodemailer transporter
let transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    auth: {
        user: "pramod@difm.tech",
        pass: "usde pvce gscf yjvt"
    },
});

// Function to send verification email
const sendEmailSubs = (data) => {
    var mailOptions = {
        from: "'Model Listing' <usha99412@gmail.com>",
        to: data.email,
        subject: "Verify your email",
        html: `
            <p>Dear ${data.name},</p>
            <p>We're excited to welcome you to World Model Hunt!</p>
            <p>World Model Hunt is your ultimate destination for all things related to modeling, magazines, castings, and interviews.</p>
            <p>Please take a moment to verify your email to complete your registration.</p>
            <p>By joining World Model Hunt, you'll gain access to:</p>
            <ul>
                <li>Exciting casting opportunities from top agencies</li>
                <li>Exclusive interviews with industry experts</li>
                <li>Inspiring magazine features showcasing the latest trends</li>
            </ul>
            <p>Click the link below to verify your email:</p>
            <p>
                <a href="http://localhost:5173/verify_email/">Verify Email</a>
            </p>
            <p>We can't wait to see you on World Model Hunt!</p>
            <p>Best regards,<br>The World Model Hunt Team</p>
        `
    };

    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log(error);
        } else {
            console.log("Email sent successfully!");
        }
    });
};

// Function to add user to the database
export const addUser = (req, res) => {
    const { name, email, confirmPassword, role } = req.body;
    console.log("confirmPassword:", confirmPassword);

    let responseSent = false; // Flag to track if response has been sent

    const sendErrorResponse = (error, statusCode = 500) => { 
        if (!responseSent) {
            responseSent = true;
            console.error(error);
            return res.status(statusCode).json({ error });
        }
    };

    checkExistingEmail(email)
        .then(existingEmail => {
            if (existingEmail) {
                console.log("Email already exists");
                return sendErrorResponse("Email already exists", 400);
            }

            // Hash password
            const hashedPassword = bcrypt.hashSync(confirmPassword, 10);

            // Insert user data into auth table
            const authSql = "INSERT INTO `auth` (`name`, `email`, `password`, `role`) VALUES (?, ?, ?, ?)";
            const authValues = [
                name,
                email,
                hashedPassword,
                role || "user",
            ];

            // Begin database transaction
            db.beginTransaction(function (err) {
                if (err) {
                    return sendErrorResponse("Database transaction error");
                }

                db.query(authSql, authValues, function (error, results) {
                    if (error) {
                        return db.rollback(function () {
                            return sendErrorResponse("Error occurred while inserting data");
                        });
                    }

                    // Commit transaction
                    db.commit(function (err) {
                        if (err) {
                            return db.rollback(function () {
                                return sendErrorResponse("Error committing transaction");
                            });
                        }

                        sendEmailSubs({ name, email });
                        console.log("Data inserted successfully");

                        if (!responseSent) {
                            responseSent = true;
                            return res.status(200).json({ message: 'Data inserted successfully' });
                        }
                    });
                });
            });
        })
        .catch(error => {
            return sendErrorResponse("Internal server error");
        });
};

// Function to check if a user with the same email already exists
const checkExistingEmail = (email) => {
    return new Promise((resolve, reject) => {
        const sql = "SELECT * FROM `auth` WHERE `email` = ?";
        const values = [email];
        db.query(sql, values, (err, result) => {
            if (err) {
                reject(err);
            } else {
                resolve(result.length > 0);
            }
        });
    });
};









//===================================== end =====================================

export const verify_email = (req, res) => { 
    const userId = req.params.uId;

    const sql = "UPDATE `auth` SET `verify_email` = 1 WHERE `id_auth` = ?";
    
    db.query(sql, [userId], (err, data) => {
        if (err) {
            console.error("Error:", err);
            return res.status(500).json({ error: "Error updating email verification" });
        }

        if (data.affectedRows === 0) {
            console.log("No rows affected. User not found or already verified.");
            db.query("SELECT * FROM `auth` WHERE `id_auth` = ?", [userId], (err, userData) => {
                if (err) {
                    console.error("Error:", err);
                    return res.status(500).json({ error: "Error finding user" });
                }

                if (userData.length === 0) {
                    console.log("User not found.");
                    return res.status(404).json({ error: "User not found" });
                } else if (userData[0].verify_email === true) {
                    console.log("User already verified.");
                    return res.status(400).json({ error: "User already verified" });
                } else {
                    console.log("User found and verified successfully!");
                    return res.status(200).json({ message: "Email verified successfully!" });
                }
            });
        } else {
            return res.status(200).json({ message: "Email verified successfully!" });
        }
    });
};


//===================================== end =====================================

//===============================**************** this is authentication of admin web token ******************================

  


export const Login = (req, res) => {
    const sqlExistenceCheck = `SELECT * FROM auth WHERE email = ?`;
    db.query(sqlExistenceCheck, [req.body.email], (err, data) => {
      if (err) {
        return res.status(500).json({ Error: "Database error" });
      }
      if (data.length > 0) {
        const user = data[0];
        bcrypt.compare(req.body.password.toString(), user.password, (err, response) => {
          if (err) {
            return res.status(500).json({ Error: "Password comparison error" });
          }
          if (response) {
            const id = user.id_auth;
            const name = user.name;
            const token = jwt.sign({ id, name }, process.env.JWT_SECRET_KEY, { expiresIn: '1d' });
            console.log("Generated Token:", token);
            res.cookie('token', token, { 
              httpOnly: true, 
              secure: process.env.NODE_ENV === 'production',
              sameSite: 'lax'
            });
            console.log("Cookie set with token");
            console.log('Response Headers:', res.getHeaders());
            return res.status(200).json({ Success: "Login successful", token });
          } else {
            return res.status(401).json({ Error: "Password not matched!" });
          }
        });
      } else {
        return res.status(404).json({ Error: "No matching email found." });
      }
    });
  };
  




export const verifyJwt = (req, res, next) => {
  const token = req.cookies.token;
  console.log("Token from cookies:", token);

  if (!token) {
    console.log("No token provided.");
    return res.status(401).json({ Error: "You are not authenticated!" });
  }

  jwt.verify(token, process.env.JWT_SECRET_KEY, (err, decoded) => {
    if (err) {
      console.log("Token verification failed:", err);
      return res.status(403).json({ Error: "Token is not valid" });
    } else {
      console.log("Token decoded successfully:", decoded);
      req.id = decoded.id;
      next();
    }
  });
};

  

 export const checkauth = (req, res) => {
  const sql = `SELECT * FROM auth WHERE id_auth = ?`;
  console.log("Checking authentication for user ID:", req.id);
  db.query(sql, [req.id], (err, data) => {
    if (err) {
      console.error("Database query error:", err);
      return res.status(500).json({ Error: "Database error" });
    }
    if (data.length > 0) {
      const user = data[0];
      const limitedData = {
        Status: "Success",
        id: req.id,
        name: user.name,
        email: user.email,
        role: user.role,
      };
      console.log("User data retrieved successfully:", limitedData);
      return res.status(200).json(limitedData);
    } else {
      console.log("User not found.");
      return res.status(404).json({ Error: "User not found" });
    }
  });
};

//===================================== end =====================================


//=============================== this is authentication of admin web token ================
export const logout = (req, res) => {
    res.clearCookie('token');
    return res.json({Status: "Success"});
};
//===================================== end ===========================================