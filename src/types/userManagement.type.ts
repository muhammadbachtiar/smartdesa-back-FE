export type PermissionData = {
    id: number,
    function: string,
    apps: string,
    created_at: string,
    updated_at: string
}

export type RoleData = {
    id: number,
    nama: string,
    created_at: string,
    updated_at: string,
    permissions?: PermissionData[]
    permission?: number[]
}

export type UserData = {
    id: number,
    name: string,
    email: string,
    email_verified_at: string | null,
    created_at: string,
    updated_at: string,
    avatar: string,
    roles?: RoleData[]
}

export type DetailUserData = {
    id: number,
    name: string,
    email: string,
    email_verified_at: string | null,
    created_at: string,
    updated_at: string,
    avatar: string,
    roles?: number[],
    password?: string
}