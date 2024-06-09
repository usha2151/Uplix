import express from 'express';
import { sendEmail } from "../controller/emailSend.js";

const SmtpsetRouter = express.Router();


SmtpsetRouter.post('/smtp-add', sendEmail);

export default SmtpsetRouter;