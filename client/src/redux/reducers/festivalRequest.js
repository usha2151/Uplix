
import { FESTIVALS_REQUEST } from "../actions/action";
const initialState = {
    pendingNotifications: [],
  };
  
  const festivalRequestReducer = (state = initialState, action) => {
    
    switch (action.type) {
      case FESTIVALS_REQUEST:
        return {
          ...state,
          pendingNotifications: action.payload,
        };
      default:
        return state;
    }
  };
  
  export default festivalRequestReducer;