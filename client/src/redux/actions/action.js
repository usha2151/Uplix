import axios from 'axios';
import { serverUrl } from '../../Component/Common/serverUrl';

export const SET_AUTH = 'SET_AUTH';


// =============================== authenticate login admin ========================================//

export const setAuth = (isAuthenticated, id, name, email, role) => ({
    type: SET_AUTH,
    payload: { isAuthenticated, id, name, email, role },
  });


  