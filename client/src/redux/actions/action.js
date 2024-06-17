import axios from 'axios';


export const SET_AUTH = 'SET_AUTH';
export const USER_CLIENTS= 'USER_CLIENTS';
export const ADD_FESTIVALS = 'ADD_FESTIVALS';
export const FESTIVALS_VERIFIED ='FESTIVALS_VERIFIED';
export const FESTIVALS_REQUEST ='FESTIVALS_REQUEST';



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


// add festivals

export const AddFestivals = (festivalData, userType) => {
  return async (dispatch) => {
    try {
      festivalData.userType = userType;
      console.log(festivalData);
      const response = await axios.post('http://localhost:8080/festivals/add-festivals', festivalData).then(() => {
        alert('done');
      }).catch((err)=>{
        alert(err);
      })
      dispatch({
        type: ADD_FESTIVALS,
        payload: response 
      });
    } catch (error) {
      console.error('Error adding festival:', error);
    }
  };
};

// fetch festivals pending request

export const verifyFestival = () => {
  return async (dispatch) => {
    try {
      const response = await axios.get('http://localhost:8080/festivals/verifyFestivals');
      dispatch({ 
        type: FESTIVALS_VERIFIED,
         payload: response.data 
        });
    } catch (error) {
      console.error('Error fetching pending notifications:', error);
    }
  }
}

// fetch festivals pending request

export const pendingFestival = () => {
  return async (dispatch) => {
    try {
      const response = await axios.get('http://localhost:8080/festivals/festival-request');
      dispatch({ 
        type: FESTIVALS_REQUEST,
         payload: response.data 
        });
    } catch (error) {
      console.error('Error fetching pending notifications:', error);
    }
  }
}