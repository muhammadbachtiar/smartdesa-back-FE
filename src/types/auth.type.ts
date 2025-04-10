import { RoleData } from "./userManagement.type";

export type  LoginRequestDTO = {
    email: string;
    password: string;
}

export type UserData = {
    avatar: string | null
    created_at: string
    deleted_at: string
    email: string
    email_verified_at: string
    id: number
    name: string
    updated_at: string
    roles?: RoleData[],
}

export type UserStateContext = {
    isLoggedIn: boolean | null;
    data: UserData | null;
    permissions: string[];
}



