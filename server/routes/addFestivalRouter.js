import express from 'express';

import { addFestivals, pendingFestivals, updateFestivalStatus, verifiedFestivals, scheduleEmail, fetchScheduledData, updateFestivalSelection, getUserFestivals } from '../controller/addFestivals.js';

const AddFestivalRouter = express.Router();fetchScheduledData


AddFestivalRouter.post('/add-festivals', addFestivals).get('/festival-request', pendingFestivals).get('/verifyFestivals', verifiedFestivals).put('/statusChange', updateFestivalStatus)
.post('/scheduleEmail', scheduleEmail)
.get('/fetchscheduleData/:id',fetchScheduledData)
.post('/selectedFestivals', updateFestivalSelection)
.get('/getSelectedFestivals/:userId', getUserFestivals);

export default AddFestivalRouter;