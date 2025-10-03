import { User } from './user.types'; 
export type LoginRequest = {
    email: string;
    password: string;
};

export type LoginResponse = {
    success: boolean;
    data: {
        user: User; 
        token: string;
    };
};