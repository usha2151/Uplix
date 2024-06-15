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

export const scheduleEmail = async (req, res) => {
  const { festival_id, festival_subject, festival_message} = req.body;

  try {
    await db.query('INSERT INTO `festival_emails`(`festival_id`, `festival_subject`, `festival_message`) VALUES (?, ?, ?)', [
      festival_id,
      festival_subject,
      festival_message
    ]);

    res.status(200).json({ message: 'Email scheduled successfully' });
  } catch (error) {
    console.error('Error scheduling email:', error);
    res.status(500).json({ message: 'Failed to schedule email', error });
  }
};