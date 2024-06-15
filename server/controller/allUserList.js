import db from "../database_Config/db.js";

export const allUsers = (req, res) => {
    try {
    //   const query = 'SELECT name, email FROM auth WHERE role = ?';
      const query = `SELECT 
    a.id_auth AS user_id,
    a.name AS user_name,
    a.email AS user_email,
    COALESCE(COUNT(uc.client_id), 0) AS client_count
FROM
    auth a
LEFT JOIN
    userclients uc ON a.id_auth = uc.user_id
GROUP BY
    a.id_auth, a.name, a.email;
`
      const role = 'user'; 
  
      db.query(query, [role], (err, results) => {
        if (err) {
          console.error('Error fetching users:', err);
          res.status(500).json({ message: 'Failed to fetch users' });
        } else {
          res.status(200).json(results);
        }
      });
    } catch (err) {
      console.error('Error in try-catch block:', err);
      res.status(500).json({ message: 'Internal server error' });
    }
  };
  