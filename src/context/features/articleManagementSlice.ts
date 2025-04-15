import { createSlice } from "@reduxjs/toolkit";
import { PayloadAction } from "@reduxjs/toolkit";
import { ArticleData } from "../../types/articleManagement.type";

const initialState  = {
  articleData: { pages: {}, searchResults: {}},
  articleDataMeta: { next_page_url: '', prev_page_url: '', total: 0, per_page: 0, current_page: 0, last_page: 0 }
};

const articleManagementSlice = createSlice({
  name: 'articleManagement',
  initialState,
  reducers: {
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
      state.articleData = { pages: {}, searchResults: {}};
      state.articleDataMeta = { next_page_url: '', prev_page_url: '', total: 0, per_page: 0, current_page: 0, last_page: 0 };
    },
  },
});

export const { setArticleData, setArticleDataMeta, clearArticleManagementData } = articleManagementSlice.actions;
export default articleManagementSlice.reducer;
