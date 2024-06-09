import express from 'express';
import multer from 'multer';
import { allClients } from '../controller/clientsData.js';
const storage = multer.memoryStorage(); 
const upload = multer({ storage: storage });

import { UserClients } from '../controller/clientsData.js';

const  UserClientsRouter = express.Router();


UserClientsRouter.post('/user-clients',upload.single('clients'), UserClients).get('/clientsData', allClients)

export default UserClientsRouter;