import db from "../database_Config/db.js";
import bcrypt from "bcrypt";
import  jwt  from "jsonwebtoken";


//========================== Admin Login ===================================
export const adminlogin = (req, res) => {
    const { email, password } = req.body.formData;

    // Check in admin table
    const adminSql = "SELECT * FROM `admin` WHERE `user_email` = ?";
    db.query(adminSql, [email], (err, adminData) => {
        if (err) return res.json({ Error: "Login error in server" });
        if (adminData.length > 0) {
            bcrypt.compare(password.toString(), adminData[0].password, (err, response) => {
                if (err) return res.json({ Error: "Password comparison error" });
                if (response) {
                    const id = adminData[0].id;
                    const token = jwt.sign({ id, role: 'admin' }, process.env.JWT_SECRET_KEY);
                    return res.json({ Status: "Success", token: token, data: adminData , type:"admin"});
                } else {
                    return res.json({ Error: "Password not matched!" });
                }
            });
        } else {
            // If not found in admin table, check in user table
            const userSql = "SELECT * FROM `user` WHERE `user_email` = ?";
            db.query(userSql, [email], (err, userData) => {
                if (err) return res.json({ Error: "Login error in server" });
                if (userData.length > 0) {
                    bcrypt.compare(password.toString(), userData[0].user_password, (err, response) => {
                        if (err) return res.json({ Error: "Password comparison error" });
                        if (response) {
                            const id = userData[0].id;
                            const token = jwt.sign({ id, role: 'user' }, process.env.JWT_SECRET_KEY);
                            return res.json({ Status: "Success", token: token, data: userData, type:"user" });
                        } else {
                            return res.json({ Error: "Password not matched!" });
                        }
                    });
                } else {
                    return res.json({ Error: "No email existed" });
                }
            });
        }
    });
};
//===================================== end =====================================



// verify token
export const verifyToken = (req, res, next) => {
    const token = req.headers.authorization;
    console.log(token);
    if (!token) {
      return res.status(401).json({ message: 'Unauthorized' });
    }
    jwt.verify(token, process.env.JWT_SECRET_KEY, (err, decoded) => {
      if (err) {
        return res.status(401).json({ message: 'Token verification failed' });
      }
      req.userId = decoded.userId;
      next();
    });
  };




  
