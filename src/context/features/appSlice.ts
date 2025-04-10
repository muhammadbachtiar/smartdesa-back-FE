import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoading: false,
  search: '',
  currentPage: 1,
  errorMessage: null,
  isError: false
};

const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    setLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    setSearch: (state, action) => {
      state.search = action.payload;
    },
    setCurrentPage: (state, action) => {
      state.currentPage = action.payload;
    },
    setErrorMessage: (state, action) => {
      state.errorMessage = action.payload;
    },
    setErrorStatus: (state, action) => {
      state.isError = action.payload;
    },
    cleareStatusApp: (state) => {
      state.isLoading = false;
      state.errorMessage = null;
      state.isError = false;
    },
  },
});

export const { setLoading, setErrorMessage, setSearch, setCurrentPage, setErrorStatus, cleareStatusApp } = appSlice.actions;
export default appSlice.reducer;
