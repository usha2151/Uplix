import db from "../database_Config/db.js";

export const addFestivals = (req,res) => {
    const { date, name, title } = req.body;

    const status_id = 1;

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
  const query = 'SELECT `festival_id`, `festival_name`, `festival_date`, `festival_title`, `status_id` FROM `festival_list` WHERE `status_id` = 1';
  
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