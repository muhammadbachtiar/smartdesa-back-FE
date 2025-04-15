import { createSlice } from "@reduxjs/toolkit";
import { PayloadAction } from "@reduxjs/toolkit";
import { CategoryData } from "../../types/categoryManagement.type";

const initialState  = {
  categoryData: { pages: {}, searchResults: {}},
  categoryDataMeta: { next_page_url: '', prev_page_url: '', total: 0, per_page: 0, current_page: 0, last_page: 0 },
};

const categoryManagementSlice = createSlice({
  name: 'categoryManagement',
  initialState,
  reducers: {
    setCategoryData(state: { categoryData: { pages: { [key: string]:  CategoryData[]}; searchResults: {[key:string]: {[key:string]:  CategoryData[]}}}}, action: PayloadAction<{ page: string; data: CategoryData[]; search: string | undefined }>) {
      const { page, data, search } = action.payload;

      if (search) {
        if (!state.categoryData.searchResults[search]) {
          state.categoryData.searchResults[search] = {};
        }
        state.categoryData.searchResults[search][page] = data;
      } else {
        state.categoryData.pages[page] = data;
      }
    },

    setCategoryDataMeta: (state, action) => {
        state.categoryDataMeta = action.payload;
    },

    clearCategoryManagementData: (state) => {
      state.categoryData = { pages: {}, searchResults: {}};
      state.categoryDataMeta = { next_page_url: '', prev_page_url: '', total: 0, per_page: 0, current_page: 0, last_page: 0 };
    },
  },
});

export const { setCategoryData, setCategoryDataMeta, clearCategoryManagementData } = categoryManagementSlice.actions;
export default categoryManagementSlice.reducer;
