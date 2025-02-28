import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const ApiClient = createApi({
    reducerPath: "api",
    baseQuery: fetchBaseQuery({
        baseUrl: "https://test.api.mydays.uz",
        prepareHeaders: (headers) => {
            const token = localStorage.getItem("token");
            if (token) {
                headers.set("Authorization", `Bearer ${token}`);
            }
            return headers;
        },
    }),
    endpoints: (builder) => ({
        GetUser: builder.query({
            query: () => ({
                url: "/api/v1/user/me/",
            }),
        }),
        UpdateUser: builder.mutation({
            query: (data) => ({
                url: "/api/v1/user/me/",
                method: "PUT",
                body: data,
            }),
        }),
        LeadList: builder.query({
            query: () => ({
                url: "/api/v1/lead/list/",
            }),
        })
    }),
});

// Hooklarni eksport qilish
export const { useGetUserQuery, useUpdateUserMutation, useLeadListQuery } = ApiClient;
