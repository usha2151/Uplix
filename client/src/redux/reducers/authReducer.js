import { act } from "react";
import { SET_AUTH } from "../actions/action";

const initialState = {
  isAuthenticated: false,
  id: null,
  name:'',
  email:'',
  role: '',
  error: '',
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    
    case SET_AUTH:
      return {
        ...state,
        isAuthenticated: action.payload.isAuthenticated,
        id: action.payload.id,
        name:action.payload.name,
        email:action.payload.email,
        role:action.payload.role,
      };

    default:
      return state;
  }
};

export default authReducer;