
export type AuthUser = {
    role: string;
    id: string;
}

export interface User extends AuthUser {
    email: string;
    name: string;
}

export type AuthToken ={
    accessToken: string;
    refreshToken: string;
}

export type LoginResponse = {
    accessToken: string;
    refreshToken: string;
    role: 'admin' | 'staff' | 'player'
    name: string;
    id: string;
}