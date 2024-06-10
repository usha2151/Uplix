import express from 'express';
import { verify_email, logout, addUser, Login, verifyJwt, checkauth} from '../controller/authController.js';

const authRouter = express.Router();

authRouter.get('/checkauth', verifyJwt, checkauth);
authRouter.post('/login', Login);
authRouter.get('/logout', logout);
authRouter.post('/add-user', addUser);
authRouter.get('/verify_email/:uId', verify_email);

export default authRouter;
