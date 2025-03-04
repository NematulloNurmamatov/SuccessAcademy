export interface LoginData {
    username: string;
    password: string;
}

export interface ErrorResponse {
    response?: {
        status: number;
    };
}


export interface LoginResponse {
    token: string;
    user: UserProfile;
    access: string;
    refresh: string;
    user_id: string;
    user_role: string;
}



export interface UserProfile {
    firstName: string;
    lastName: string;
    avatar: string;
}