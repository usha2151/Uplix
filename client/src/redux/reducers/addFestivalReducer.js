import { ADD_FESTIVALS } from "../actions/action";

const initialState = {
    festivals: []
  };

  const addFestival = (state = initialState, action) => {
    switch (action.type) {
      case ADD_FESTIVALS:
        return {
          ...state,
          festivals: [...state.festivals, action.payload]
        };
      default:
        return state;
    }
  };
  
  export default addFestival;

