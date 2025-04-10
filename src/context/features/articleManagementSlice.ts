import { createSlice } from "@reduxjs/toolkit";
import { PayloadAction } from "@reduxjs/toolkit";
import { ArticleData, CategoryData } from "../../types/articleManagement.type";

const initialState  = {
  categoryData: { pages: {}, searchResults: {}},
  categoryDataMeta: { next_page_url: '', prev_page_url: '', total: 0, per_page: 0, current_page: 0, last_page: 0 },
  articleData: { pages: {}, searchResults: {}},
  articleDataMeta: { next_page_url: '', prev_page_url: '', total: 0, per_page: 0, current_page: 0, last_page: 0 }
};

const articleManagementSlice = createSlice({
  name: 'articleManagement',
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

    setArticleData(state: { articleData: { pages: { [key: string]:  ArticleData[]}; searchResults: {[key:string]: {[key:string]:  ArticleData[]}}}}, action: PayloadAction<{ page: string; data: ArticleData[]; search: string | undefined }>): void {
      const { page, data, search } = action.payload;

      if (search) {
        if (!state.articleData.searchResults[search]) {
          state.articleData.searchResults[search] = {};
        }
        state.articleData.searchResults[search][page] = data;
      } else {
        state.articleData.pages[page] = data;
      }
    },

    setArticleDataMeta: (state, action) => {
        state.articleDataMeta = action.payload;
    },

    clearArticleManagementData: (state) => {
      state.categoryData = { pages: {}, searchResults: {}};
      state.categoryDataMeta = { next_page_url: '', prev_page_url: '', total: 0, per_page: 0, current_page: 0, last_page: 0 };
      state.articleData = { pages: {}, searchResults: {}};
      state.articleDataMeta = { next_page_url: '', prev_page_url: '', total: 0, per_page: 0, current_page: 0, last_page: 0 };
    },
  },
});

export const { setCategoryData, setCategoryDataMeta, setArticleData, setArticleDataMeta, clearArticleManagementData } = articleManagementSlice.actions;
export default articleManagementSlice.reducer;
