import express from 'express';
import { getSignature, addOrUpdateSignature } from '../controller/Addsignature.js';
const addSignature = express.Router();

addSignature.get('/getsignature/:userid', getSignature);
addSignature.post('/addsignature', addOrUpdateSignature);

export default addSignature;
