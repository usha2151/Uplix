import express from 'express';

import { adminlogin,  verifyToken } from '../controller/adminAuthenticate.js';

const adminRouter = express.Router();


adminRouter.post('/admin-login', adminlogin);

adminRouter.get('/dashboard', verifyToken, (req, res) => {
   
        return res.json({ status: "success", id: req.id });
})

export default adminRouter;
