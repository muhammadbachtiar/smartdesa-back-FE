import { createSlice } from "@reduxjs/toolkit";
import { PayloadAction } from "@reduxjs/toolkit";
import { InfografisData } from "../../types/infografisManagement.type";

const initialState  = {
  infografisData: { pages: {}, searchResults: {}},
  infografisDataMeta: { next_page_url: '', prev_page_url: '', total: 0, per_page: 0, current_page: 0, last_page: 0 }
};

const infografisManagementSlice = createSlice({
  name: 'infografisManagement',
  initialState,
  reducers: {
    setInfografisData(state: { infografisData: { pages: { [key: string]:  InfografisData[]}; searchResults: {[key:string]: {[key:string]:  InfografisData[]}}}}, action: PayloadAction<{ page: string; data: InfografisData[]; search: string | undefined }>): void {
      const { page, data, search } = action.payload;
      if (search) {
        if (!state.infografisData.searchResults[search]) {
          state.infografisData.searchResults[search] = {};
        }
        state.infografisData.searchResults[search][page] = data;
      } else {
        state.infografisData.pages[page] = data;
      }
    },

    setInfografisDataMeta: (state, action) => {
        state.infografisDataMeta = action.payload;
    },

    clearInfografisManagementData: (state) => {
      state.infografisData = { pages: {}, searchResults: {}};
      state.infografisDataMeta = { next_page_url: '', prev_page_url: '', total: 0, per_page: 0, current_page: 0, last_page: 0 };
    },
  },
});

export const { setInfografisData, setInfografisDataMeta, clearInfografisManagementData } = infografisManagementSlice.actions;
export default infografisManagementSlice.reducer;
