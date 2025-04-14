import { configureStore } from '@reduxjs/toolkit';
import userReducer from "./features/userSlice"
import userManagementReducer from './features/userManagementSlice'
import articleManagementReducer from './features/articleManagementSlice'
import appReducer from './features/appSlice'
import CategoryManagement from './features/categoryManagementSlice';

const store = configureStore({
    reducer: {
      user: userReducer,
      userManagement: userManagementReducer,
      articleManagement: articleManagementReducer,
      categoryManagement: CategoryManagement,
      app: appReducer
    },
});
  
  export default store;