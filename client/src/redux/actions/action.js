import axios from 'axios';
import { serverUrl } from '../../Component/Common/serverUrl';

export const SET_AUTH = 'SET_AUTH';
export const USER_CLIENTS= 'USER_CLIENTS';


// =============================== authenticate login admin ========================================//

export const setAuth = (isAuthenticated, id, name, email, role) => ({
    type: SET_AUTH,
    payload: { isAuthenticated, id, name, email, role },
  });

export const UserClients = (id) => {
  return async (dispatch) => {
    try {
      const response = await axios.get(`http://localhost:8080/userClients/clientsData/${id}`);
      dispatch({ 
        type: USER_CLIENTS,
        payload: response.data.clients 
      });
    } catch (error) {
      console.error('Error fetching pending notifications:', error);
    }
  }
}