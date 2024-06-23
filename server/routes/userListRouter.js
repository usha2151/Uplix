import express from 'express';
import { allUsers } from '../controller/allUserList.js';

const userList = express.Router();


userList.get('/usersList', allUsers);

export default userList;