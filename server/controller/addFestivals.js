import db from "../database_Config/db.js";

export const addFestivals = (req,res) => {
    const { date, name, title, userType } = req.body;
  

    let status_id;
if (userType === 'user') {
  status_id = 1;
} else if (userType === 'admin') {
  status_id = 2;
} else {
  status_id = 1; // Or any other default value you prefer
}

    const query = 'INSERT INTO festival_list (festival_name, festival_date, festival_title, status_id) VALUES (?, ?, ?, ?)';
    const values = [name, date, title, status_id];
  
    db.query(query, values, (err, result) => {
      if (err) {
        console.error('Error adding festival:', err);
        res.status(500).json({ message: 'Failed to add festival' });
      } else {
        console.log('Festival added successfully!');
        res.status(200).json({ message: 'Festival added successfully' });
      }
    });
 
}


// fetch pending festivals request

export const pendingFestivals = (req, res) => {
  const query = "SELECT `festival_id`, `festival_name`, DATE_FORMAT(`festival_date`, '%d %M, %Y') AS `festival_date`, `festival_title`, `status_id` FROM `festival_list` WHERE `status_id` = 1";
  
  db.query(query, (err, results) => {
      if (err) {
          console.error('Error fetching pending festivals:', err);
          res.status(500).json({ message: 'Failed to fetch pending festivals' });
      } else {
          res.status(200).json(results);
      }
  });
};


export const updateFestivalStatus = (req, res) => {
  const { festivalId, statusId } = req.body;
  console.log(statusId);
  console.log(festivalId);

  const query = 'UPDATE festival_list SET status_id = ? WHERE festival_id = ?';
  const values = [statusId, festivalId];

  db.query(query, values, (err, result) => {
    if (err) {
      console.error('Error updating festival status:', err);
      res.status(500).json({ message: 'Failed to update festival status' });
    } else {
      console.log('Festival status updated successfully!');
      res.status(200).json({ message: 'Festival status updated successfully' });
    }
  });
};

// verified festivals by admin 

export const verifiedFestivals = (req, res) => {
  const query = "SELECT `festival_id`, `festival_name`, DATE_FORMAT(`festival_date`, '%d %M, %Y') AS `festival_date`, `festival_title`  FROM `festival_list` WHERE `status_id` = 2";
  
  db.query(query, (err, results) => {
      if (err) {
          console.error('Error fetching pending festivals:', err);
          res.status(500).json({ message: 'Failed to fetch pending festivals' });
      } else {
          res.status(200).json(results);
      }
  });
};


// set festival description 

export const scheduleEmail = (req,res) => {
  const { festival_id, festival_subject, festival_message} = req.body;


const querySelect = 'SELECT * FROM `festival_emails` WHERE `festival_id` = ?';
const queryUpdate = 'UPDATE `festival_emails` SET `festival_subject` = ?, `festival_message` = ? WHERE `festival_id` = ?';
const queryInsert = 'INSERT INTO `festival_emails`(`festival_id`, `festival_subject`, `festival_message`) VALUES (?, ?, ?)';

db.query(querySelect, [festival_id], (err, result) => {
  if (err) {
    console.error('Error fetching user email signature:', err);
    res.status(500).json({ message: 'Failed to fetch user email signature' });
  } else {
    if (result.length > 0) {
   
      // Record exists, update it
      db.query(queryUpdate, [festival_subject, festival_message, festival_id], (updateErr, updateRes) => {
        if (updateErr) {
          console.error('Error updating email signature:', updateErr);
          res.status(500).json({ message: 'Failed to update email signature' });
        } else {
          res.status(200).json({ message: 'Email updated successfully' });
        }
      });
    } else {
      // Record does not exist, insert new one
      db.query(queryInsert, [festival_id, festival_subject, festival_message], (insertErr, insertRes) => {
        if (insertErr) {
          console.error('Error inserting email signature:', insertErr);
          res.status(500).json({ message: 'Failed to insert email signature' });
        } else {
          res.status(200).json({ message: 'Email scheduled successfully' });
        }
      });
    }
  }
});
}

export const fetchScheduledData = (req, res) => {
  const { id } = req.params; 

  const querySelect = 'SELECT * FROM `festival_emails` WHERE `festival_id` = ?';

  db.query(querySelect, [id], (err, result) => {
    if (err) {
      console.error('Error fetching scheduled data:', err);
      res.status(500).json({ message: 'Failed to fetch scheduled data' });
      return;
    }

    if (result.length > 0) {
      res.status(200).json(result);
    } else {
      res.status(404).json({ message: 'No scheduled data found' });
    }
  });
};

// selected user festvals

export const updateFestivalSelection = (req, res) => {
  const { userId, festivalId, isSelected } = req.body;
  console.log(req.body);

  if (isSelected) {
    const sql = `INSERT INTO user_festivals_selection (user_id, festival_id) VALUES (?, ?)`;
    db.query(sql, [userId, festivalId], (error, results) => {
      if (error) {
        console.error('Error inserting festival selection:', error);
        res.status(500).json({ success: false, message: 'Error inserting festival selection' });
        return;
      }
      res.status(200).json({ success: true, message: 'Festival selected successfully' });
    });
  } else {
    const sql = `DELETE FROM user_festivals_selection WHERE user_id = ? AND festival_id = ?`;
    db.query(sql, [userId, festivalId], (error, results) => {
      if (error) {
        console.error('Error deleting festival selection:', error);
        res.status(500).json({ success: false, message: 'Error deleting festival selection' });
        return;
      }
      res.status(200).json({ success: true, message: 'Festival deselected successfully' });
    });
  }
};


// fetch selected user festivals
export const getUserFestivals = (req, res) => {
  const { userId } = req.params;

  const sql = `SELECT festival_id FROM user_festivals_selection WHERE user_id = ?`;
  db.query(sql, [userId], (error, results) => {
    if (error) {
      console.error('Error fetching user festivals:', error);
      res.status(500).json({ success: false, message: 'Error fetching user festivals' });
      return;
    }

    const selectedFestivals = results.map(row => row.festival_id);
    res.status(200).json({ success: true, selectedFestivals });
  });
};
