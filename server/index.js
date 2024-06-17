import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import adminRouter from './routes/adminRouter.js';
import userRouter from './routes/userRegisterRoute.js';
import otpRouter from './routes/emailVerifyRoute.js';
import UserClientsRouter from './routes/clientListRouter.js';
import SmtpsetRouter from './routes/smptRouter.js';
import AddFestivalRouter from './routes/addFestivalRouter.js';
import authRouter from './routes/authRouter.js';
import addSignature from './routes/addSignature.js';
import userList from './routes/userListRouter.js';
import { checkFestivalForToday } from './controller/emailSent.js';
import cron from 'node-cron';

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(cookieParser());
app.use(bodyParser.json());
app.use(express.json());
app.use(cors({
  origin: 'http://localhost:5173',
  methods: ['POST', 'GET', 'PUT', 'DELETE'],
  credentials: true,
}));

// Define routes
app.use('/api/auth', authRouter);
app.use('/admin', adminRouter);
app.use('/user', userRouter);
app.use('/otp', otpRouter);
app.use('/userClients', UserClientsRouter);
app.use('/SMTP', SmtpsetRouter);
app.use('/festivals', AddFestivalRouter);
app.use('/signature', addSignature);
app.use('/users', userList);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});


// functions run at 8 am every day
cron.schedule('31 22 * * *', () => {
  checkFestivalForToday();
  });
  