import { Book } from './book.types';

export interface User {
    id: number;
    email: string;
    password?: string;
    name: string;
    createdAt?: Date;
    updatedAt?: Date;
    books?: Book[]; 
}

export interface CreateUserRequest {
    email: string;
    password: string;
    name: string;
}

export interface UpdateUserRequest {
    email?: string;
    password?: string;
    name?: string;
}

export interface UserResponse {
    user: User;
    message: string;
}

export interface UsersListResponse {
    users: User[];
    total: number;
}