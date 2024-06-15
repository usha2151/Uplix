import express from 'express';

import { addFestivals, pendingFestivals, updateFestivalStatus, verifiedFestivals, scheduleEmail } from '../controller/addFestivals.js';

const AddFestivalRouter = express.Router();


AddFestivalRouter.post('/add-festivals', addFestivals).get('/festival-request', pendingFestivals).get('/verifyFestivals', verifiedFestivals).put('/statusChange', updateFestivalStatus)
.post('/scheduleEmail', scheduleEmail);

export default AddFestivalRouter;