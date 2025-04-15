import { configureStore } from '@reduxjs/toolkit';
import userReducer from "./features/userSlice"
import userManagementReducer from './features/userManagementSlice'
import articleManagementReducer from './features/articleManagementSlice'
import appReducer from './features/appSlice'
import CategoryManagement from './features/categoryManagementSlice';
import infografisManagementReducer from './features/infografisManagementSlice';

const store = configureStore({
    reducer: {
      user: userReducer,
      userManagement: userManagementReducer,
      articleManagement: articleManagementReducer,
      categoryManagement: CategoryManagement,
      infografisManagement: infografisManagementReducer,
      app: appReducer
    },
});
  
  export default store;