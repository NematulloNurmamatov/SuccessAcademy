import api from "./api";

interface LoginData {
    email: string;
    password: string;
}

export const login = async (data: LoginData) => {
    try {
        const response = await api.post("/api/v1/auth/login/", data);
        return response.data; 
    } catch (error) {
        console.error("Login error:", error);
        throw error;
    }
};

