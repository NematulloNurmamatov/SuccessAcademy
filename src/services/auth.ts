import api from "./api";

// Login va foydalanuvchi interfeyslari

interface LoginData {
    username: string;
    password: string;
}

interface UserProfile {
    firstName: string;
    lastName: string;
    avatar: string;
}

interface LoginResponse {
    token: string;
    user: UserProfile;
    access: string;
    refresh: string;
    user_id: string;
    user_role: string;
}


// ✅ Login funksiyasi
export const login = async (data: LoginData): Promise<LoginResponse> => {
    try {
        const response = await api.post<LoginResponse>("/api/v1/auth/login/", data);
        const { token, user } = response.data;

        // Tokenni localStorage ga saqlash
        localStorage.setItem("token", token);
        localStorage.setItem("user", JSON.stringify(user));

        return response.data;
    } catch (error: any) {
        console.error("Login error:", error.response?.data || error.message);
        throw new Error(error.response?.data?.message || "Login failed");
    }
};

// ✅ Logout funksiyasi
// export const logout = async () => {
//     try {// ✅ Foydalanuvchi profilini yangilash funksiyasi
//         export const updateUser = async (data: UserProfile): Promise<UserProfile> => {
//             try {
//                 const token = localStorage.getItem("token");
//                 if (!token) throw new Error("No token found");
        
//                 const response = await api.put<UserProfile>("/api/v1/user/me/", data, {
//                     headers: { Authorization: `Bearer ${token}` },
//                 });
        
//                 const updatedUser = response.data;
//                 localStorage.setItem("user", JSON.stringify(updatedUser));
        
//                 return updatedUser;
//             } catch (error: any) {
//                 console.error("Error updating user:", error.response?.data || error.message);
//                 throw new Error("Failed to update user profile");
//             }
//         };
        
//         await api.post("/api/v1/auth/logout/", null, {
//             headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
//         });

//         // Token va foydalanuvchi ma'lumotlarini o‘chirish
//         localStorage.removeItem("token");
//         localStorage.removeItem("user");
//     } catch (error: any) {
//         console.error("Logout error:", error.response?.data || error.message);
//         throw new Error("Logout failed");
//     }
// };

// ✅ Foydalanuvchi ma'lumotlarini olish (API dan yoki localStorage'dan)
export const getUser = async (): Promise<UserProfile | null> => {
    try {
        const token = localStorage.getItem("token");
        if (!token) return null;

        const response = await api.get<UserProfile>("/api/v1/user/me/", {
            headers: { Authorization: `Bearer ${token}` },
        });

        const user = response.data;
        localStorage.setItem("user", JSON.stringify(user));
        return user;
    } catch (error: any) {
        console.error("Error fetching user:", error.response?.data || error.message);
        return null;
    }
};



// ✅ Foydalanuvchi profilini yangilash funksiyasi
export const updateUser = async (data: UserProfile): Promise<UserProfile> => {
    try {
        const token = localStorage.getItem("token");
        if (!token) throw new Error("No token found");

        const response = await api.put<UserProfile>("/api/v1/user/me/", data, {
            headers: { Authorization: `Bearer ${token}` },
        });

        const updatedUser = response.data;
        localStorage.setItem("user", JSON.stringify(updatedUser));

        return updatedUser;
    } catch (error: any) {
        console.error("Error updating user:", error.response?.data || error.message);
        throw new Error("Failed to update user profile");
    }
};
