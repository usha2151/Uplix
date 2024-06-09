import express from 'express';
import dotenv from 'dotenv';
import cors from "cors";
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import adminRouter from './routes/adminRouter.js';
import userRouter from './routes/userRegisterRoute.js';
import otpRouter from './routes/emailVerifyRoute.js';
import UserClientsRouter from './routes/clientListRouter.js';
import SmtpsetRouter from './routes/smptRouter.js';
import AddFestivalRouter from './routes/addFestivalRouter.js';


dotenv.config(); 

const app = express();
const port = process.env.PORT || 3000;

app.use(cookieParser());
app.use(express.json());
app.use(bodyParser.json());
app.use(cors({
    origin: ['http://localhost:5173'],
    methods: ['POST', 'GET', 'PUT'],
    credentials: true,
}));



//============ API for admin ================
app.use('/admin', adminRouter);

//============ API for user ================
app.use('/user', userRouter);

//============ verifyEmail through Otp ================
app.use('/otp', otpRouter);

//============ UsersClients ================
app.use('/userClients',UserClientsRouter);

//============ SMTP SET ================
app.use('/SMTP',SmtpsetRouter);

//============ Api for Festivals ================
app.use('/festivals',AddFestivalRouter);


app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});