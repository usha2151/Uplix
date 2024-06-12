import db from "../database_Config/db.js";
import xlsx from 'node-xlsx';

export const UserClients = (req, res) => {
    console.log(req.body);
    if (req.file && req.body.userId) {
        console.log(req.body.userId);
        const workbook = xlsx.parse(req.file.buffer);
        // Assuming the first sheet contains the data
        const sheet = workbook[0].data;

        const headers = sheet[0];
        const data = sheet.slice(1);
        const clientsData = data.map(row => {
            let client = {};
            headers.forEach((header, index) => {
                client[header] = row[index];
            });
            return client;
        });

        // Add userId to each client data object
        clientsData.forEach(client => {
            client.userId = req.body.userId[0];
        });
        console.log(clientsData);

        // Prepare values for insertion
        const values = clientsData.map(client => [client.userId, client.firstName, client.lastName, client.email]);

        // Insert clients data into the database
        db.query('INSERT INTO userclients (user_id, first_name, last_name, email) VALUES ?', [values], (err, result) => {
            if (err) {
                console.error('Error inserting data into database:', err);
                res.status(500).json({ success: false, message: 'Error inserting data into database' });
            } else {
                console.log('Data inserted successfully');
                res.status(200).json({ success: true, message: 'Data inserted successfully' });
            }
        });
    }
    else if (req.body.userData && req.body.userId) {
        const userData = JSON.parse(req.body.userData);

        if (!Array.isArray(userData)) {
            console.log("userData must be an array of user objects");
            return res.status(400).json({ success: false, message: 'userData must be an array of user objects' });
        }

        // Add userId to each user data object
        userData.forEach(user => {
            user.userId = req.body.userId;
        });

        // Prepare values for insertion
        const values = userData.map(user => [user.userId, user.firstName, user.lastName, user.email]);

        // Insert user data into the database
        db.query('INSERT INTO userclients (user_id, first_name, last_name, email) VALUES ?', [values], (err, result) => {
            if (err) {
                console.error('Error inserting data into database:', err);
                res.status(500).json({ success: false, message: 'Error inserting data into database' });
            } else {
                console.log('Data inserted successfully');
                res.status(200).json({ success: true, message: 'Data inserted successfully' });
            }
        });
    }
    else {
        console.log("File or userId not provided");
        res.status(400).json({ success: false, message: 'File or userId not provided' });
    }
};

// All user's client data
export const allClients = (req, res) => {
    const id = req.params.id; 
    console.log(id);
    console.log("hii");
    


    const sql = `SELECT * FROM userclients WHERE user_id = ?`;

    db.query(sql, [id], (error, results) => {
        if (error) {
            console.error('Error querying database:', error);
            res.status(500).json({ success: false, message: 'Error fetching clients' });
            return;
        }

        // If no user found
        if (results.length === 0) {
            res.status(404).json({ success: false, message: 'No clients found' });
            return;
        }
        res.status(200).json({ success: true, message: 'Clients fetched successfully', clients: results });
   console.log(results);
    });
};
