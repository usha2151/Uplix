import express from 'express';
import multer from 'multer';
import { allClients, deleteClientsData, editUserClients, editActiveorInactive } from '../controller/clientsData.js';
const storage = multer.memoryStorage(); 
const upload = multer({ storage: storage });

import { UserClients } from '../controller/clientsData.js';

const  UserClientsRouter = express.Router();


UserClientsRouter.post('/user-clients',upload.single('clients'), UserClients).get('/clientsData/:id', allClients)
.put('/updateClient/:clientId', editUserClients)
.delete('/deleteClient/:clientId', deleteClientsData)
.put('/updateStatus/:clientId', editActiveorInactive)


export default UserClientsRouter;