import { configureStore } from "@reduxjs/toolkit";
// import { authApi } from "../services/auth";
import AuthSlice from "./AuthSlice";
import { ApiClient } from "../services/Service";

export const store = configureStore({
    reducer: {
        setAuth: AuthSlice,


        [ApiClient.reducerPath]: ApiClient.reducer
    },

    middleware: (getDefaultMiddlewere) => {
        return getDefaultMiddlewere().concat(ApiClient.middleware);
    }
});


export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch