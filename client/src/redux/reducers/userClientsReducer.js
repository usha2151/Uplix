import { USER_CLIENTS } from "../actions/action";

const initialState = {
  clients: [],
};

const userClientsReducer = (state = initialState, action) => {
  switch (action.type) {
    case USER_CLIENTS:
      return {
        ...state,
        clients: action.payload,
      };
    default:
      return state;
  }
};

export default userClientsReducer;
