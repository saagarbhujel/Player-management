
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

export type INavLink ={
    // imageUrl: string;
    route: string;
    label: string;
}

export type Player = {
    id: string;
    name: string;
    rank: string;
    active: boolean;
    country: Country;
    statistics: Statistics;
}

export type Statistics = {
    experience_point: number;
    coins: number;
    games_won: number;
    games_played: number;
}

export enum Country {
    Nepal = 'np',
    India = 'in',
    "United States" = 'us',
    Australia = 'au',
    Afghanistan = 'af',
}

export const CountryMap = new Map()
.set(Country.Nepal, 'Nepal')
.set(Country.India, 'India')
.set(Country['United States'], 'United States')
.set(Country.Australia, 'Australia')
.set(Country.Afghanistan, 'Afghanistan');


export type PageMeta = {
    totalItems: number
  itemsPerPage: number
  currentPage: number
  totalPages: number
  hasNextPage: boolean
  hasPreviousPage: boolean
}

export type Room = {
    name: string;
    players: {
        id: string;
        name: string;
    }[];
}

export type Message = {
    id: string,
    sender_id: string,
  created_at: string,
  message: string,
}