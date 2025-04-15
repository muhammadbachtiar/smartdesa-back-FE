import { ArticleData } from "./articleManagement.type";
import { UserStateContext } from "./auth.type";
import { CategoryData } from "./categoryManagement.type";
import { InfografisData } from "./infografisManagement.type";
import { PermissionData } from "./userManagement.type";
import { RoleData } from "./userManagement.type";
import { UserData } from "./userManagement.type";

export type MetaType = {
    next_page_url: string | null;
    prev_page_url: string | null;
    total: number;
    per_page: number;
    current_page: number;
    last_page: number;
}

export type userManagementStateContext = {
    permissionsData: {
        pages: {
            [key: string]:  PermissionData[];
          };
    }; 
    permissionsDataMeta: MetaType;
    roleData:  {
        pages: { [key: string]: RoleData[] },
        searchResults: { [key: string]: { [key: string]: RoleData[] } }
    };
    roleDataMeta: MetaType;
    userData: UserData[];
    userDataMeta: MetaType;
}

export type articleManagementStateContext = {
    articleData:  {
        pages: { [key: string]: ArticleData[] },
        searchResults: { [key: string]: { [key: string]: ArticleData[] } }
    };
    articleDataMeta: MetaType;
}

export type categoryManagementStateContext = {
    categoryData: {
        pages: { [key: string]: CategoryData[] },
        searchResults: { [key: string]: { [key: string]: CategoryData[] } }
    }; 
    categoryDataMeta: MetaType;
}
  
export type infografisManagementStateContext = {
    infografisData:  {
        pages: { [key: string]: InfografisData[] },
        searchResults: { [key: string]: { [key: string]: InfografisData[] } }
    };
    infografisDataMeta: MetaType;
}


export type AppContext = {
    isLoading: boolean,
    search: string,
    currentPage: number,
    errorMessage: string | null,
    isError: boolean

}

export type StateContext = {
    user: UserStateContext;
    userManagement: userManagementStateContext;
    articleManagement: articleManagementStateContext;
    categoryManagement: categoryManagementStateContext;
    infografisManagement: infografisManagementStateContext;
    app: AppContext;
}