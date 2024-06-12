import { configureStore } from '@reduxjs/toolkit'
import authReducer from './reducers/authReducer'
import userClientsReducer from './reducers/userClientsReducer'

export const store = configureStore({
  reducer: {
    auth:authReducer,
    userClientsReducer
  },
})