import express from 'express';
import multer from 'multer';
import { registerUser } from '../controller/userAuthentication.js';
import path from 'path';

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploads/'); // Images ko save karne ke liye destination folder ka path
    },
    filename: function (req, file, cb) {
      cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname)); // Unique filename generate karne ke liye
    }
  });
  const upload = multer({ storage: storage });

const userRouter = express.Router();
userRouter.post('/user-register',upload.single('clientList'), registerUser)



export default userRouter;
