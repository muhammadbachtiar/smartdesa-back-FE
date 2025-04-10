import { configureStore } from '@reduxjs/toolkit';
import userReducer from "./features/userSlice"
import userManagementReducer from './features/userManagementSlice'
import articleManagementReducer from './features/articleManagementSlice'
import appReducer from './features/appSlice'

const store = configureStore({
    reducer: {
      user: userReducer,
      userManagement: userManagementReducer,
      articleManagement: articleManagementReducer,
      app: appReducer
    },
});
  
  export default store;