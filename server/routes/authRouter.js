// routes/blogRouter.js
import express from 'express';
import { verify_email, checkauth, logout, addUser , Login, verifyJwt} from '../controller/authController.js';

const authRouter = express.Router();

//============ Route for adding a blog ================
authRouter.post('/login', Login)
          .get('/checkauth', verifyJwt, checkauth)
          .get('/logout', logout)
          .post("/add-user",  addUser)
          .get('/verify_email/:uId', verify_email);
          

export default authRouter;