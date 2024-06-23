
import { FESTIVALS_VERIFIED } from "../actions/action";
const initialState = {
    pendingNotifications: [],
  };
  
  const festivalPendingReducer = (state = initialState, action) => {
    
    switch (action.type) {
      case FESTIVALS_VERIFIED:
        return {
          ...state,
          pendingNotifications: action.payload,
        };
      default:
        return state;
    }
  };
  
  export default festivalPendingReducer;