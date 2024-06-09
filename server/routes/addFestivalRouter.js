import express from 'express';

import { addFestivals, pendingFestivals, updateFestivalStatus } from '../controller/addFestivals.js';

const AddFestivalRouter = express.Router();


AddFestivalRouter.post('/add-festivals', addFestivals).get('/festival-request', pendingFestivals).put('/statusChange', updateFestivalStatus);

export default AddFestivalRouter;