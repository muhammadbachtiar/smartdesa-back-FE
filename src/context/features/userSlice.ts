import { createSlice } from "@reduxjs/toolkit";
import { UserStateContext } from "../../types/auth.type";

const initialState : UserStateContext = {
  isLoggedIn: null,
  data: null,
  permissions: []
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setLoginStatus: (state, action) => {
      state.isLoggedIn = action.payload;
    },
    setData: (state, action) => {
      state.data = action.payload;
    },
    setPermissions: (state, action) => {
      state.permissions = action.payload;
    },
    clearUser: (state) => {
      localStorage.removeItem('token');
      state.isLoggedIn = false;
      state.data = null;
      state.permissions = [];
    },
  },
});

export const { setLoginStatus, setData, setPermissions, clearUser } = userSlice.actions;
export default userSlice.reducer;
