import { createSlice } from "@reduxjs/toolkit";
import { PermissionData, RoleData } from "../../types/userManagement.type";
import { PayloadAction } from "@reduxjs/toolkit";

const initialState  = {
  permissionsData: { pages: {"1": [] }},
  permissionsDataMeta: { next_page_url: '', prev_page_url: '', total: 0, per_page: 0, current_page: 0, last_page: 0 },
  roleData: { pages: {}, searchResults: {}},
  roleDataMeta: { next_page_url: '', prev_page_url: '', total: 0, per_page: 0, current_page: 0, last_page: 0 },
  userData: [],
  userDataMeta: { next_page_url: '', prev_page_url: '', total: 0, per_page: 0, current_page: 0, last_page: 0 }
};

const userManagementSlice = createSlice({
  name: 'userManagement',
  initialState,
  reducers: {
    setPermissionData(state: { permissionsData: { pages: { [key: string]: PermissionData[] } } }, action: PayloadAction<{ page: string; data: PermissionData[] }>) {
      const { page, data } = action.payload;
      state.permissionsData.pages[page] = data;
    },

    setPermissionDataMeta: (state, action) => {
        state.permissionsDataMeta = action.payload;
    },

    setRoleData(state: { roleData: { pages: { [key: string]:  RoleData[]}; searchResults: {[key:string]: {[key:string]:  RoleData[]}}}}, action: PayloadAction<{ page: string; data: RoleData[]; search: string | undefined }>) {
      const { page, data, search } = action.payload;

      if (search) {
        if (!state.roleData.searchResults[search]) {
          state.roleData.searchResults[search] = {};
        }
        state.roleData.searchResults[search][page] = data;
      } else {
        state.roleData.pages[page] = data;
      }
    },

    setRoleDataMeta: (state, action) => {
        state.roleDataMeta = action.payload;
    },

    setUserData: (state, action) => {
      state.userData = action.payload;
    },

    setUserDataMeta: (state, action) => {
        state.userDataMeta = action.payload;
    },

    clearUserManagementData: (state) => {
      state.permissionsData = { pages: {"1": [] }};
      state.permissionsDataMeta = { next_page_url: '', prev_page_url: '', total: 0, per_page: 0, current_page: 0, last_page: 0 };
      state.roleData = { pages: {}, searchResults: {}};
      state.roleDataMeta = { next_page_url: '', prev_page_url: '', total: 0, per_page: 0, current_page: 0, last_page: 0 };
    },
  },
});

export const { setPermissionData, setPermissionDataMeta, setRoleData, setRoleDataMeta, setUserData, setUserDataMeta,clearUserManagementData } = userManagementSlice.actions;
export default userManagementSlice.reducer;
