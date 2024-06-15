import { configureStore } from '@reduxjs/toolkit'
import authReducer from './reducers/authReducer'
import userClientsReducer from './reducers/userClientsReducer'
import addFestival from './reducers/addFestivalReducer'
import festivalPendingReducer from './reducers/festivalPendingReducer'

export const store = configureStore({
  reducer: {
    auth:authReducer,
    userClientsReducer,
    addFestival,
    festivalPendingReducer
  },
})