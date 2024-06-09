import db from "../database_Config/db.js";
import bcrypt from "bcrypt";

export const registerUser = (req, res) => {
    const { websiteUrl, occasion, signature, registrationData } = req.body;
   
    if(req.file){
 const clientListFilename = req.file; // Access uploaded file name
 console.log(clientListFilename);
    }

    console.log(websiteUrl, occasion, signature, registrationData);


    // const fullName = `${firstName} ${lastName}`;


    // Hash the password
    // bcrypt.hash(password, 10, (err, hashedPassword) => {
    //     if (err) return res.status(500).json({ error: "Error hashing password" });

    //     // Insert user data into database
    //     const sql = "INSERT INTO `user` (`user_name`, `user_email`, `user_password`, `user_signature`, `clients_list`, `occesion`) VALUES (?, ?, ?, ?, ?, ?)";
    //     db.query(sql, [fullName, email, hashedPassword, signature, clientlist, occasion], (err, result) => {
    //         if (err) {
    //             return res.status(500).json({ error: "Error registering user" });
    //         } else {
    //             console.log("done");
    //             return res.status(200).json({ message: "User registered successfully" });
    //         }
    //     });
    // });
};
