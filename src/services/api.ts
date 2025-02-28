import axios from "axios";

const api = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL, // .env faylidan olish
    headers: {
        "Content-Type": "application/json",
    },
});

export default api;


// import axios from "axios";

// const api = axios.create({
//     baseURL: import.meta.env.VITE_API_BASE_URL, // .env faylidan olish
//     headers: {
//         "Content-Type": "application/json",
//     },
// });

// // 🔹 Har bir so‘rovga avtomatik token qo‘shish
// api.interceptors.request.use((config) => {
//     const token = localStorage.getItem("token");
//     if (token) {
//         config.headers.Authorization = `Bearer ${token}`;
//     }
//     return config;
// });

// // 🔹 Agar token muddati tugagan bo‘lsa, avtomatik logout qilish
// api.interceptors.response.use(
//     (response) => response,
//     (error) => {
//         if (error.response?.status === 401) {
//             localStorage.removeItem("token");
//             localStorage.removeItem("user");
//             window.location.href = "/login"; // 🔹 Foydalanuvchini login sahifasiga yo‘naltirish
//         }
//         return Promise.reject(error);
//     }
// );

// export default api;
