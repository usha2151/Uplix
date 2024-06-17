import db from "../database_Config/db.js";

export const getSignature = (req, res) => {
  const userId = req.params.userid;

  try {
    const query = 'SELECT * FROM user_email_signature WHERE user_id = ?';
    db.query(query, [userId], (err, result) => {
      if (err) {
        console.error('Error fetching user email signature:', err);
        res.status(500).json({ message: 'Failed to fetch user email signature' });
      } else {
        if (result.length > 0) {
          res.status(200).json(result[0]); // Assuming you expect only one signature per user
        } else {
          res.status(404).json({ message: 'Signature not found' });
        }
      }
    });
  } catch (err) {
    console.error('Error in try-catch block:', err);
    res.status(500).json({ message: 'Internal server error' });
  }
};

export const addOrUpdateSignature = async (req, res) => {
  console.log(req.body);
  const { userId, name, designation, phone, email, company, street, city, zipCode, country, website } = req.body;

  try {
    // Check if a signature already exists for the given userId
    db.query('SELECT * FROM user_email_signature WHERE user_id = ?', [userId], (err, rows) => {
      if (err) {
        console.error('Error querying for existing signature:', err);
        return res.status(500).json({ message: 'Internal server error' });
      }

      if (rows.length > 0) {
        // Update existing signature
        db.query(
          'UPDATE user_email_signature SET name = ?, designation = ?, phone = ?, email = ?, company = ?, street = ?, city = ?, zipCode = ?, country = ?, website = ? WHERE user_id = ?',
          [name, designation, phone, email, company, street, city, zipCode, country, website, userId],
          (err, result) => {
            if (err) {
              console.error('Error updating signature:', err);
              return res.status(500).json({ message: 'Internal server error' });
            }
            res.status(200).json({ message: 'Signature updated successfully' });
          }
        );
      } else {
        // Insert new signature
        db.query(
          'INSERT INTO user_email_signature (user_id, name, designation, phone, email, company, street, city, zipCode, country, website) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
          [userId, name, designation, phone, email, company, street, city, zipCode, country, website],
          (err, result) => {
            if (err) {
              console.error('Error inserting new signature:', err);
              return res.status(500).json({ message: 'Internal server error' });
            }
            res.status(201).json({ message: 'Signature added successfully' });
          }
        );
      }
    });
  } catch (err) {
    console.error('Error in try-catch block:', err);
    res.status(500).json({ message: 'Internal server error' });
  }
};
