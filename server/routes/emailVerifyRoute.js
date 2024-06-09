import express from 'express';
import { otpGenerate } from "../controller/emailVerify.js";

const otpRouter = express.Router();


otpRouter.post('/email-otp', otpGenerate);

export default otpRouter;

